// Internal dependencies
import { Action, ActionParams } from "./Action";
// External dependencies
import React from "react";
import { enableMapSet, produce } from "immer";

enableMapSet();

export type Resolver = <T extends keyof ActionParams>(key: T) => ActionParams[T] | undefined;

export type Provider<T extends keyof ActionParams> = (resolver: Resolver) => ActionParams[T] | undefined;
export type Handler = (params: Partial<ActionParams>, invoke: (action: Action, params?: Partial<ActionParams>) => void) => void

type GenericProvider = (resolver: Resolver) => Partial<ActionParams>

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>]
type Ref = React.Ref<void>;

const ActionContext = React.createContext<{
    useOverride: (ref: Ref) => React.Dispatch<Partial<ActionParams>>,
    useProvider: <T extends keyof ActionParams>(ref: Ref, key: T) => React.Dispatch<Provider<T>>,
    useStateProvider: <T extends keyof ActionParams>(ref: Ref, key: T, state: State<ActionParams[T]>) => State<ActionParams[T]>,
    useHandler: (ref: Ref, action: Action) => React.Dispatch<Handler>,
    params: Partial<ActionParams>,
    invoke: (action: Action, params?: Partial<ActionParams>) => void,
}>(null);
export default ActionContext;

export function ActionContextProvider(props: {children: React.ReactNode}) {
    const [overrides, setOverrides] = React.useState<Map<Ref, Partial<ActionParams>>>(new Map());
    const useOverride = (ref: Ref) => (override: Partial<ActionParams>) => {
        console.log(`Setting ref ${ref} to override:`)
        console.log(override);
        setOverrides(overrides => produce(overrides, overrides => {
            overrides.set(ref, override);
            console.log(`Updated overrides:`)
            console.log(overrides.get(ref))
        }));
    }

    console.log(`Calculating total overrides`);
    const totalOverrides: Partial<ActionParams> = {};
    for (const override of overrides.values()) {
        console.log(`Applying override:`)
        console.log(override);
        Object.assign(totalOverrides, override);
    }
    console.log(`Total overrides:`)
    console.log(totalOverrides);

    const [providers, setProviders] = React.useState<Map<keyof ActionParams, [Ref, GenericProvider]>>(new Map());
    const useProvider = <T extends keyof ActionParams>(ref: Ref, key: T) => (provider: Provider<T>) => {
        setProviders(providers => produce(providers, providers => {
            const prev = providers.get(key);
            if (prev && prev[0] == ref) {
                throw new Error(`Multiple providers for ${key} were provided by separate refs`);
            }
            const generic = (resolver: Resolver) => {
                const params: Partial<ActionParams> = {};
                params[key] = provider(resolver);
                return params;
            }
            providers.set(key, [ref, generic]);
        }));
    }

    const resolveParams = (baseParams: Partial<ActionParams>) => {
        const params: Partial<ActionParams> = {};
        Object.assign(params, baseParams);
        console.log(`Resolving params from base params:`)
        console.log(params);

        const resolver = <T extends keyof ActionParams>(key: T) => {
            console.log(`Resolving param ${key}`);
            if (params[key] != undefined) {
                console.log(`Param ${key} was already resolved to ${params[key]}`);
                return params[key] as ActionParams[T];
            }
            const provider = providers.get(key);
            if (provider) {
                const func = provider[1];
                console.log(`Invoking provider ${func}`);
                const provided = func(resolver);
                console.log(`Provided params:`)
                console.log(provided);
                Object.assign(params, provided);
            }
            console.log(`Param ${key} is now resolved to ${params[key]}`);
            return params[key] as ActionParams[T] | undefined;
        }

        for (const key of providers.keys()) {
            resolver(key);
        }
        
        console.log(`Resolved params:`)
        console.log(params);
        return params;
    }

    const useStateProvider = <T extends keyof ActionParams>(
        ref: Ref, key: T, state: State<ActionParams[T]>
    ): State<ActionParams[T]> => {
        const [currentState, setState] = state;
        const needsInitialization = providers.get(key) == undefined;
        const setProvider = useProvider(ref, key);
        if (needsInitialization) {
            setProvider(resolver => currentState);
        }
        const hookedSetState = (value: React.SetStateAction<ActionParams[T]>) => {
            if (typeof value == "function") {
                const hookedAction = (prevState: ActionParams[T]) => {
                    const nextState = value(prevState);
                    setProvider(resolver => nextState);
                    return nextState;
                }
                setState(hookedAction);
            } else {
                setProvider(resolver => value);
                setState(value);
            }
        }
        return [currentState, hookedSetState];
    }

    const [handlers, setHandlers] = React.useState<Map<Ref, [Action, Handler]>>(new Map());
    const useHandler = (ref: Ref, action: Action) => (handler: Handler) => {
        setHandlers(handlers => produce(handlers, handlers => {
            const prev = handlers.get(ref);
            if (prev && prev[0] != action) {
                throw new Error(`Multiple handlers of different actions were provided by the same ref`);
            }
            handlers.set(ref, [action, handler]);
        }));
    }

    const invokeHandlers = (action: Action, baseParams?: Partial<ActionParams>) => {
        baseParams ??= {};
        console.log(`Invoking action ${action} with base params:`)
        console.log(baseParams);

        const overriddenParams: Partial<ActionParams> = {};
        Object.assign(overriddenParams, totalOverrides);
        Object.assign(overriddenParams, baseParams);
        console.log(`Base params and overrides:`)
        console.log(overriddenParams);

        const resolvedParams = resolveParams(overriddenParams);
        console.log(`Resolved params:`)
        console.log(resolvedParams);

        for (const handler of handlers.values()) {
            if (handler[0] == action) {
                const func = handler[1];
                console.log(`Invoking handler ${func}`);
                func(resolvedParams, invokeHandlers);
            }
        }
        console.log(`Finished invoking action`);
    }

    return (
        <ActionContext.Provider value={{
            useOverride: useOverride,
            useProvider: useProvider,
            useStateProvider: useStateProvider,
            useHandler: useHandler,
            params: resolveParams(totalOverrides),
            invoke: invokeHandlers,
        }}>
            {props.children}
        </ActionContext.Provider>
    );
}