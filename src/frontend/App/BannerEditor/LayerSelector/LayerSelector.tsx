import "./LayerSelector.css"
// Internal dependencies
import ColorDisplay from "./ColorDisplay/ColorDisplay";
import ColorSelector from "./ColorSelector/ColorSelector";
import PatternSelector from "./PatternSelector/PatternSelector";
import ActionContext from "frontend/action/ActionContext";
import { Action } from "frontend/action/Action";
import Color from "model/Color";
// External dependencies
import React from "react";
import { COLOR_DISPLAY_WIDTH, COLOR_SELECTOR_HEIGHT, COLOR_SELECTOR_WIDTH, LAYER_SELECTOR_WIDTH } from "../BannerEditor";
import ForceSize from "frontend/ForceSize/ForceSize";

export default function LayerSelector() {
    const actionContext = React.useContext(ActionContext);

    const [primary, setPrimary] = actionContext.useStateProvider(
        React.useRef(), "primary", React.useState(Color.BLACK));
    const [secondary, setSecondary] = actionContext.useStateProvider(
        React.useRef(), "secondary", React.useState(Color.WHITE));
    const colorProvider = actionContext.useProvider(React.useRef(), "color");

    const selectColorHandler = actionContext.useHandler(React.useRef(), Action.SELECT_COLOR);
    const swapColorsHandler = actionContext.useHandler(React.useRef(), Action.SWAP_COLORS);

    React.useEffect(() => {
        colorProvider(resolver => resolver("isSecondary") ? resolver("secondary") : resolver("primary"));

        selectColorHandler(params => {
            if (params.color == undefined) {
                return;
            }
            if (params.isSecondary) {
                setSecondary(params.color);
            } else {
                setPrimary(params.color);
            }
        })

        swapColorsHandler(params => {
            setPrimary(params.secondary);
            setSecondary(params.primary);
        })
    }, []);

    return (
        <div className="LayerSelector" style={{"--LayerSelectorWidth": LAYER_SELECTOR_WIDTH} as any}>
            <div className="LayerSelectorColorRow">
                <ForceSize className="LayerSelectorColorDisplay">
                    <ColorDisplay primary={primary} secondary={secondary}
                        onSwap={() => actionContext.invoke(Action.SWAP_COLORS)}/>
                </ForceSize>
                <div className="LayerSelectorColorSpacer"/>
                <ForceSize className="LayerSelectorColorSelector">
                    <ColorSelector
                        onColorSelected={(color, isSecondary) =>
                            actionContext.invoke(Action.SELECT_COLOR, {color: color, isSecondary: isSecondary})}/>
                </ForceSize>
            </div>
            <PatternSelector color={actionContext.params.color ?? Color.BLACK}
                onPatternSelected={(pattern, isSecondary) =>
                    actionContext.invoke(Action.INSERT_LAYER, {pattern: pattern, isSecondary: isSecondary})}/>
        </div>
    )
}

