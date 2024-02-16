import "./LayerStack.css"
// Internal dependencies
import LayerDisplay from "./LayerDisplay/LayerDisplay";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import ActionContext from "frontend/action/ActionContext";
import { Action } from "frontend/action/Action";
import Banner from "model/Banner";
// External dependencies
import React from "react";

export default function LayerStack(props: {banner: Banner}) {
    const actionContext = React.useContext(ActionContext);

    return (
        <div className="LayerStack">
            {props.banner.layers.map((_, i) =>
                <LayerDisplay key={i} index={i} banner={props.banner}/>
            )}
            {props.banner.layers.length == 0 &&
                <div className="LayerStackBackgroundSquare">
                    <Button
                        onLeftClick={() => actionContext.invoke(
                            Action.SET_LAYER_COLOR, {layerIndex: 0, isSecondary: false})}
                        onRightClick={() => actionContext.invoke(
                            Action.SET_LAYER_COLOR, {layerIndex: 0, isSecondary: true})}>
                        <BannerComponent banner={new Banner(props.banner.background)}/>
                    </Button>
                </div>
            }
        </div>
    )
}

