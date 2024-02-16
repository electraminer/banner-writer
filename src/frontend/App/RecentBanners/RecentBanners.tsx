import "./RecentBanners.css"
// Internal dependencies
import WritingContext from "../WritingContext";
import RecentContext from "../RecentContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Text from "frontend/Text/Text";
import Button from "frontend/Button/Button";
import ActionContext from "frontend/action/ActionContext";
import { Action } from "frontend/action/Action";
// External dependencies
import React from "react";

export default function RecentBanners() {
    const writingContext = React.useContext(WritingContext);
    const recentContext = React.useContext(RecentContext);
    const actionContext = React.useContext(ActionContext);

    return (
        <div className="RecentBanners">
            <div className="RecentBannersHeader">
                <Text text="RECENT BANNERS"/>
            </div>
            <div className="RecentBannersScrollBox">
                {recentContext.recent.slice().reverse().map((banner, i) =>
                    <Button key={i}
                        onLeftClick={() => writingContext.addBanner(banner)}
                        onRightClick={() => actionContext.invoke(Action.SET_BANNER, {banner: banner})}>
                        <BannerComponent banner={banner}/>
                    </Button>
                )}
            </div>
        </div>
    );
}