import "./LayerDisplay.css"
// Internal dependencies
import ColorContext from "../../ColorContext";
import BannerContext from "../../../BannerContext";
import Button from "frontend/Button/Button";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Banner from "model/Banner";
import { contrastingColor } from "model/Color";
// External dependencies
import React from "react";

export default function LayerDisplay(props: {index: number}) {
    const colorContext = React.useContext(ColorContext);
    const bannerContext = React.useContext(BannerContext);

    const layer = bannerContext.banner.layers[props.index];

    return (
        <div className="LayerDisplay">
            <Button
                onLeftClick={() => bannerContext.updateBanner(
                    (banner: Banner) => banner.layers[props.index] = colorContext.primary
                )}
                onRightClick={() => bannerContext.updateBanner(
                    (banner: Banner) => banner.layers[props.index] = colorContext.secondary
                )}>
                <BannerComponent banner={new Banner(contrastingColor(layer.color), layer)}/>
            </Button>
            <div className="LayerDisplayControls">
                {(props.index == 0) ?
                    <Button
                        onLeftClick={() => bannerContext.updateBanner(
                            (banner: Banner) => banner.background = colorContext.primary
                        )}
                        onRightClick={() => bannerContext.updateBanner(
                            (banner: Banner) => banner.background = colorContext.secondary
                        )}>
                        <BannerComponent banner={new Banner(bannerContext.banner.background)}/>
                    </Button>
                :
                    <Button
                        onLeftClick={() => bannerContext.updateBanner(
                            (banner: Banner) => {
                                const prevLayer = banner.layers[props.index - 1];
                                banner.layers[props.index - 1] = layer;
                                banner.layers[props.index] = prevLayer;
                            }
                        )}>
                        <BannerComponent banner={Banner.fromString("󏿷󏿷󏿷󏿷")[0]}/>
                    </Button>
                }
                <Button
                    onLeftClick={() => bannerContext.updateBanner(
                        (banner: Banner) => banner.layers.splice(props.index, 1)
                    )}>
                    <BannerComponent banner={Banner.fromString("󏿷󏿷")[0]}/>
                </Button>
                    
            </div>
        </div>
    )
}

