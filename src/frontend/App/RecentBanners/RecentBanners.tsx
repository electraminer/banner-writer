import "./RecentBanners.css"
// Internal dependencies
import WritingContext from "../WritingContext";
import RecentContext from "../RecentContext";
import BannerContext from "../BannerContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Text from "frontend/Text/Text";
import Button from "frontend/Button/Button";
import ForceSize from "frontend/ForceSize/ForceSize";
// External dependencies
import React from "react";
import Banner from "model/Banner";
import Color from "model/Color";

export default function RecentBanners() {
    const writingContext = React.useContext(WritingContext);
    const recentContext = React.useContext(RecentContext);
    const bannerContext = React.useContext(BannerContext);

    const [deleting, setDeleting] = React.useState(false);

    return (
        <div className="RecentBanners">
            
            <ForceSize className="RecentBannersHeader">
                <div className="RecentBannersHeaderArea">
                    <Text text={deleting ? "DELETING RECENT" : "RECENT BANNERS"}
                        backgroundColor={deleting ? Color.RED : undefined}/>
                    <Button
                        onLeftClick={() => setDeleting(!deleting)}>
                        <BannerComponent banner={Banner.fromString("󏿷󏿷")[0]}/>
                    </Button>
                </div>
            </ForceSize>
            <div className="RecentBannersScrollBox">
                {recentContext.recent.slice().reverse().map((banner, i) =>
                    <Button key={i}
                        onLeftClick={() => {
                            if (deleting) {
                                recentContext.deleteBanner(banner);
                            } else {
                                writingContext.addBanner(banner);
                            }
                        }}
                        onRightClick={() => bannerContext.setBanner(banner)}>
                        <BannerComponent banner={banner}/>
                    </Button>
                )}
            </div>
        </div>
    );
}