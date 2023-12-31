import "./Text.css"
// Internal dependencies
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Banner from "model/Banner";
import Color, { contrastingColor } from "model/Color";

// External dependencies
import React from "react";

export default function Text(props: {
    backgroundColor?: Color,
    text: string,
}) {
    const backgroundColor = props.backgroundColor ?? Color.GRAY;
    const image = new Banner(backgroundColor).backgroundLayer().staticImagePath();
    const textColor = [Color.GRAY, Color.BLACK].includes(backgroundColor) ? "White" : "Black";

    return (
        <div className={`Text TextColor_${textColor}`}>
            <img src={image}/>
            <p>{props.text}</p>
        </div>
    )
}

