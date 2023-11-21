import "./RecentBanners.css"

import BannerButton from "components/BannerButton/BannerButton"
import WritingContext from "components/context/WritingContext"
import RecentContext from "components/context/RecentContext"
import BannerContext from "components/context/BannerContext"

import React from "react";

export default function RecentBanners() {
    const writingContext = React.useContext(WritingContext);
    const recentContext = React.useContext(RecentContext);
    const bannerContext = React.useContext(BannerContext);

    return (
        <div className='RecentBanners'>
            {recentContext.recent.slice().reverse().map((banner, i) =>
                <BannerButton banner={banner} key={i}
                    onLeftClick={() => writingContext.addBanner(banner)}
                    onRightClick={() => bannerContext.setBanner(banner)}/>
            )}
        </div>
    );
}