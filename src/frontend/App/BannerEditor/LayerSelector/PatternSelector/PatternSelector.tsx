import "./PatternSelector.css";
// Internal dependencies
import ColorContext from "../../ColorContext";
import BannerContext from "../../../BannerContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Banner from "model/Banner";
import Layer from "model/Layer";
import Pattern, { NUM_PATTERNS } from "model/Pattern";
import { contrastingColor } from "model/Color";
// External dependencies
import React from "react";

const MAX_LAYERS = 6;

export default function PatternSelector() {
    const bannerContext = React.useContext(BannerContext);
    const colorContext = React.useContext(ColorContext);

    return (
        <div className="PatternSelector">
            {Array(NUM_PATTERNS - 1).fill(0).map((_, i) => {
                const pattern = (i + 1) as Pattern;
                const layer = new Layer(colorContext.primary, pattern);
                const secondaryLayer = new Layer(colorContext.secondary, pattern);
                return <Button key={i}
                    onLeftClick={() => bannerContext.updateBanner(
                        (banner: Banner) => {
                            if (banner.layers.length < MAX_LAYERS) {
                                banner.layers.push(layer);
                            }
                        }
                    )}
                    onRightClick={() => bannerContext.updateBanner(
                        (banner: Banner) => {
                            if (banner.layers.length < MAX_LAYERS) {
                                banner.layers.push(secondaryLayer);
                            }
                        }
                    )}>
                    <BannerComponent
                        banner={new Banner(contrastingColor(colorContext.primary), layer)}/>
                </Button>
            })}
        </div>
    )
}

