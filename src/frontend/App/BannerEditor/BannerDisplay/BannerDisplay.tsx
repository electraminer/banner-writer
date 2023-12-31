import "./BannerDisplay.css"
// Internal dependencies
import BannerContext from "../../BannerContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Text from "frontend/Text/Text";
import Color from "model/Color";
// External dependencies
import React from "react";

export default function BannerDisplay() {
    const bannerContext = React.useContext(BannerContext);
    return (
        <div className="BannerDisplay">
            <BannerComponent banner={bannerContext.banner}/>
            <div className="BannerDisplayControls">
                <Button
                    onLeftClick={() => console.log("todo")}>
                    <Text backgroundColor={Color.RED} text="BACKSPACE"/>
                </Button>
                <Button
                    onLeftClick={() => console.log("todo")}>
                    <Text backgroundColor={Color.YELLOW} text="ADD SPACE"/>
                </Button>
                <Button
                    onLeftClick={() => console.log("todo")}>
                    <Text backgroundColor={Color.LIME} text="ADD LINE"/>
                </Button>
            </div>
        </div>
    )
}

