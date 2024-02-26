import "./KeyboardInterface.css";
// Internal dependencies
import { ActionParams } from "./Action";
import ActionContext from "./ActionContext";
import KeyConfig from "./KeyConfig";
// External dependencies
import React from "react";
import { produce } from "immer";


export default function KeyHandler(props: {
    children: React.ReactNode,
    config: KeyConfig,
}) {
    const ref = React.useRef<HTMLDivElement>(undefined);
    React.useEffect(() => {
        ref.current.focus();
    }, [])

    const actionContext = React.useContext(ActionContext);

    const [_, setHeldKeys] = React.useState<Set<string>>(new Set());

    const modifiersHeld = (heldKeys: Set<string>, modifiers: string[]) => {
        for (const modifier of modifiers) {
            if (!heldKeys.has(modifier)) {
                return false;
            }
        }
        return true;
    }

    const setOverride = actionContext.useOverride(React.useRef());

    const pressKey = (key: string) => {
        setHeldKeys(heldKeys => produce(heldKeys, (heldKeys) => {
            console.log(`Adding key ${key} to held keys`);
            heldKeys.add(key);

            console.log(`Currently held keys:`);
            console.log(heldKeys);

            console.log(`Calculating overrides from modifiers`);
            const params: Partial<ActionParams> = {};
            for (const modifier of props.config.modifiers) {
                console.log(`Checking modifier:`)
                console.log(modifier);
                if (modifiersHeld(heldKeys, modifier.modifiers)) {
                    console.log(`Applying overrides:`)
                    console.log(modifier.params);
                    Object.assign(params, modifier.params);
                }
            }
            console.log(`Total overrides:`);
            console.log(params);
            setOverride(params);

            console.log(`Calculating matched action`);
            let matchedAction = undefined;
            for (const action of props.config.actions) {
                console.log(`Checking action:`)
                console.log(action);
                if (action.key == key && (!action.modifiers || modifiersHeld(heldKeys, action.modifiers))) {
                    const matchedSpecificity = matchedAction?.modifiers?.length ?? 0;
                    const specificity = action.modifiers?.length ?? 0;
                    console.log(`Action matched with specificity ${specificity}`);
                    if (specificity >= matchedSpecificity) {
                        matchedAction = action;
                    }
                }
            }
            console.log(`Matched action:`);
            console.log(matchedAction);
            if (matchedAction) {
                Object.assign(params, matchedAction.params)
                console.log(`Invoking action with base params:`)
                console.log(params);
                actionContext.invoke(matchedAction.action, params);
            }
        }))
    }

    const releaseKey = (key: string) => {
        setHeldKeys(heldKeys => produce(heldKeys, (heldKeys) => {
            console.log(`Removing key ${key} from held keys`);
            heldKeys.delete(key);
            
            console.log(`Currently held keys:`);
            console.log(heldKeys);
            
            console.log(`Calculating overrides from modifiers`);
            const params: Partial<ActionParams> = {};
            for (const modifier of props.config.modifiers) {
                console.log(`Checking modifier:`)
                console.log(modifier);
                if (modifiersHeld(heldKeys, modifier.modifiers)) {
                    console.log(`Applying overrides:`)
                    console.log(modifier.params);
                    Object.assign(params, modifier.params);
                }
            }
            console.log(`Total overrides:`);
            console.log(params);
            setOverride(params);
        }))
    }

    return (
        <div className="KeyboardInterface" tabIndex={1} ref={ref}
            onKeyDown={(e) => {e.preventDefault(); pressKey(e.code)}}
            onKeyUp={(e) => {e.preventDefault(); releaseKey(e.code)}}>
            {props.children}
        </div>
    );
}