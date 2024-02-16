import "./ColorDisplay.css";
// Internal dependencies
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Banner from "model/Banner";
import Color from "model/Color";
// External dependencies
import React from "react";

export default function ColorDisplay(props: {
    primary: Color,
    secondary: Color,
    onSwap: () => void,
}) {
    return (
        <div className="ColorDisplay">
            <Button onLeftClick={props.onSwap}>
                <BannerComponent banner={new Banner(props.primary)}/>
            </Button>
            <Button onLeftClick={props.onSwap}>
                <BannerComponent banner={new Banner(props.secondary)}/>
            </Button>
        </div>
    );
}