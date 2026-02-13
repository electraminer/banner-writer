import "./Text.css"
// Internal dependencies
import asciiWriting from "./AsciiWriting";
import SettingsContext from "../SettingsContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import ForceSize from "frontend/ForceSize/ForceSize";
import Banner from "model/Banner";
import Color from "model/Color";
// External dependencies
import React from "react";

export default function Text(props: {
    backgroundColor?: Color,
    text: string,
    length?: number,
}) {
    const settingsContext = React.useContext(SettingsContext);
    
    const backgroundColor = props.backgroundColor ?? Color.GRAY;
    const textColor = ([Color.GRAY, Color.BLACK].includes(backgroundColor) ?
        Color.WHITE
    :
        Color.BLACK
    );

    const image = new Banner(backgroundColor).backgroundLayer().staticImagePath(settingsContext.colorblindMode);

    const banners = asciiWriting(props.text, backgroundColor, textColor);
    const length = props.length ?? banners.length;

    return (
        <ForceSize className={`Text TextColor_${textColor}`} aspectRatio={`${length}/2`}>
            <img className="TextBackground" src={image}/>
            <div className="TextContents">
                {settingsContext.useBannerFont ?
                    banners.map((banner, i) =>
                        <div className="TextBanner"
                            style={{
                                width: `${100/length}%`
                            }}>
                            <BannerComponent key={i} banner={banner}/>
                        </div>
                    )
                :
                    <svg viewBox={`0 0 ${length} 2`}>
                        <text x="50%" y="55%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontFamily="Consolas, monospace"
                            fontWeight="bolder"
                            fontSize="1.8px"
                            fill={textColor == Color.WHITE ? 
                                "rgb(235,241,241)"
                            :
                                "rgb(27,26,31)"
                            }>
                            {props.text}
                        </text>
                    </svg>
                }
            </div>
        </ForceSize>
    )
}

