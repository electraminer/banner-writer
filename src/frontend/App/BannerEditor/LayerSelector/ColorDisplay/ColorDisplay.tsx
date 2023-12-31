import "./ColorDisplay.css";
// Internal dependencies
import ColorContext from "../../ColorContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Banner from "model/Banner";
// External dependencies
import React from "react";

export default function ColorDisplay() {
    let colorContext = React.useContext(ColorContext);

    return (
        <div className="ColorDisplay">
            <Button onLeftClick={colorContext.swap} onRightClick={colorContext.swap}>
                <BannerComponent banner={new Banner(colorContext.primary)}/>
            </Button>
            <Button onLeftClick={colorContext.swap} onRightClick={colorContext.swap}>
                <BannerComponent banner={new Banner(colorContext.secondary)}/>
            </Button>
        </div>
    );
}