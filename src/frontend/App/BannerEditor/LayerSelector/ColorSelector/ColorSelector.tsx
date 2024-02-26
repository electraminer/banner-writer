import "./ColorSelector.css";
// Internal dependencies
import Button from "frontend/Button/Button";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Banner from "model/Banner";
import Color, { NUM_COLORS } from "model/Color";
// External dependencies
import React from "react";

export default function ColorSelector(props: {
    onColorSelected: (color: Color, secondary: boolean) => void,
}) {
    return (
        <div className="ColorSelector">
            {Array(NUM_COLORS).fill(0).map((_, i) => 
                <Button key={i}
                    onLeftClick={() => props.onColorSelected(i as Color, false)}
                    onRightClick={() => props.onColorSelected(i as Color, true)}>
                    <BannerComponent banner={new Banner(i as Color)}/>
                </Button>
            )}
        </div>
    )
}

