import "./ColorSelector.css";
// Internal dependencies
import ColorContext from "../../ColorContext";
import Button from "frontend/Button/Button";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Banner from "model/Banner";
import Color, { NUM_COLORS } from "model/Color";
// External dependencies
import React from "react";

export default function ColorSelector() {
    let colorContext = React.useContext(ColorContext);

    return (
        <div className="ColorSelector">
            {Array(NUM_COLORS).fill(0).map((_, i) => 
                <Button key={i}
                    onLeftClick={() => colorContext.setPrimary(i as Color)}
                    onRightClick={() => colorContext.setSecondary(i as Color)}>
                    <BannerComponent banner={new Banner(i as Color)}/>
                </Button>
            )}
        </div>
    )
}

