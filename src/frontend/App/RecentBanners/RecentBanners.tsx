import "./RecentBanners.css"
// Internal dependencies
import WritingContext from "../WritingContext";
import RecentContext from "../RecentContext";
import BannerContext from "../BannerContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Text from "frontend/Text/Text";
import Button from "frontend/Button/Button";
// External dependencies
import React from "react";

export default function RecentBanners() {
    const writingContext = React.useContext(WritingContext);
    const recentContext = React.useContext(RecentContext);
    const bannerContext = React.useContext(BannerContext);

    return (
        <div className="RecentBanners">
            <div className="RecentBannersHeader">
                <Text text="RECENT BANNERS"/>
            </div>
            <div className="RecentBannersScrollBox">
                {recentContext.recent.slice().reverse().map((banner, i) =>
                    <Button key={i}
                        onLeftClick={() => writingContext.addBanner(banner)}
                        onRightClick={() => bannerContext.setBanner(banner)}>
                        <BannerComponent banner={banner}/>
                    </Button>
                )}
            </div>
        </div>
    );
}