import "./BannerDisplay.css"
// Internal dependencies
import WritingContext from "../../WritingContext";
import BannerContext from "../../BannerContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Text from "frontend/Text/Text";
import Color from "model/Color";
// External dependencies
import React from "react";

export default function BannerDisplay() {
    const writingContext = React.useContext(WritingContext);
    const bannerContext = React.useContext(BannerContext);

    return (
        <div className="BannerDisplay">
            <Button
                onLeftClick={() => writingContext.addBanner(bannerContext.banner)}
                onRightClick={() => writingContext.backspace()}>
                <BannerComponent banner={bannerContext.banner}/>
            </Button>
            <div className="BannerDisplayControls">
                <div className="BannerDisplaySpacer"/>
                <Button
                    onLeftClick={() => writingContext.addBanner(bannerContext.banner)}>
                    <Text backgroundColor={Color.LIME} text="ADD BANNER" length={10}/>
                </Button>
                <div className="BannerDisplaySpacer"/>
                <Button
                    onLeftClick={() => writingContext.addSpace()}>
                    <Text backgroundColor={Color.LIGHT_BLUE} text="ADD SPACE" length={10}/>
                </Button>
                <div className="BannerDisplaySpacer"/>
                <Button
                    onLeftClick={() => writingContext.addLine()}>
                    <Text backgroundColor={Color.YELLOW} text="ADD LINE" length={10}/>
                </Button>
                <div className="BannerDisplaySpacer"/>
                <Button
                    onLeftClick={() => writingContext.backspace()}>
                    <Text backgroundColor={Color.RED} text="BACKSPACE" length={10}/>
                </Button>
            </div>
        </div>
    )
}

