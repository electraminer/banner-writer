import "./LayerStack.css"
// Internal dependencies
import LayerDisplay from "./LayerDisplay/LayerDisplay";
import ColorContext from "../ColorContext";
import BannerContext from "../../BannerContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Banner from "model/Banner";
// External dependencies
import React from "react";

export default function LayerStack() {
    const colorContext = React.useContext(ColorContext);
    const bannerContext = React.useContext(BannerContext);

    return (
        <div className="LayerStack">
            {bannerContext.banner.layers.map((_, i) =>
                <LayerDisplay key={i} index={i}/>
            )}
            {bannerContext.banner.layers.length == 0 &&
                <div className="LayerStackBackgroundSquare">
                    <Button
                        onLeftClick={() => bannerContext.updateBanner(
                            (banner: Banner) => banner.background = colorContext.primary
                        )}
                        onRightClick={() => bannerContext.updateBanner(
                            (banner: Banner) => banner.background = colorContext.secondary
                        )}>
                        <BannerComponent banner={new Banner(bannerContext.banner.background)}/>
                    </Button>
                </div>
            }
        </div>
    )
}

