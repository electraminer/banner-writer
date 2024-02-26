import "./LayerDisplay.css"
// Internal dependencies
import Button from "frontend/Button/Button";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import ActionContext from "frontend/action/ActionContext";
import { Action } from "frontend/action/Action";
import Banner from "model/Banner";
import { contrastingColor } from "model/Color";
// External dependencies
import React from "react";

export default function LayerDisplay(props: {index: number, banner: Banner}) {
    const actionContext = React.useContext(ActionContext);

    const layer = props.banner.layers[props.index];

    return (
        <div className="LayerDisplay">
            <Button
                onLeftClick={() => actionContext.invoke(
                    Action.SET_LAYER_COLOR, {layerIndex: props.index + 1, isSecondary: false})}
                onRightClick={() => actionContext.invoke(
                    Action.SET_LAYER_COLOR, {layerIndex: props.index + 1, isSecondary: true})}>
                <BannerComponent banner={new Banner(contrastingColor(layer.color), layer)}/>
            </Button>
            <div className="LayerDisplayControls">
                {(props.index == 0) ?
                    <Button
                        onLeftClick={() => actionContext.invoke(
                            Action.SET_LAYER_COLOR, {layerIndex: 0, isSecondary: false})}
                        onRightClick={() => actionContext.invoke(
                            Action.SET_LAYER_COLOR, {layerIndex: 0, isSecondary: true})}>
                        <BannerComponent banner={new Banner(props.banner.background)}/>
                    </Button>
                :
                    <Button
                        onLeftClick={() => actionContext.invoke(Action.SWAP_LAYER, {layerIndex: props.index + 1})}>
                        <BannerComponent banner={Banner.fromString("󏿷󏿷󏿷󏿷")[0]}/>
                    </Button>
                }
                <Button
                    onLeftClick={() => actionContext.invoke(Action.REMOVE_LAYER, {layerIndex: props.index + 1})}>
                    <BannerComponent banner={Banner.fromString("󏿷󏿷")[0]}/>
                </Button>
                    
            </div>
        </div>
    )
}

