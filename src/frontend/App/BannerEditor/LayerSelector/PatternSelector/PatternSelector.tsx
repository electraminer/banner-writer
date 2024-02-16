import "./PatternSelector.css";
// Internal dependencies
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Banner from "model/Banner";
import Layer from "model/Layer";
import Pattern, { NUM_PATTERNS } from "model/Pattern";
import Color, { contrastingColor } from "model/Color";
// External dependencies
import React from "react";

const MAX_LAYERS = 6;

export default function PatternSelector(props: {
    color: Color,
    onPatternSelected: (pattern: Pattern, secondary: boolean) => void,
}) {
    return (
        <div className="PatternSelector">
            {Array(NUM_PATTERNS - 1).fill(0).map((_, i) => {
                const pattern = (i + 1) as Pattern;
                return <Button key={i}
                    onLeftClick={() => props.onPatternSelected((i + 1) as Pattern, false)}
                    onRightClick={() => props.onPatternSelected((i + 1) as Pattern, true)}>
                    <BannerComponent banner={new Banner(contrastingColor(props.color), new Layer(props.color, pattern))}/>
                </Button>
            })}
        </div>
    )
}

