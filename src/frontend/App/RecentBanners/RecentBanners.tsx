import "./RecentBanners.css"
// Internal dependencies
import WritingContext from "../WritingContext";
import RecentContext from "../RecentContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Text from "frontend/Text/Text";
import Button from "frontend/Button/Button";
import ForceSize from "frontend/ForceSize/ForceSize";
import ActionContext from "frontend/action/ActionContext";
import { Action } from "frontend/action/Action";
// External dependencies
import React from "react";
import Banner from "model/Banner";
import Color from "model/Color";
import DragContext from "../DragContext";

export default function RecentBanners() {
    const writingContext = React.useContext(WritingContext);
    const recentContext = React.useContext(RecentContext);
    const actionContext = React.useContext(ActionContext);
    const dragContext = React.useContext(DragContext);

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
                        onRightClick={() => actionContext.invoke(Action.SET_BANNER, {banner: banner})}
                        onBeginDrag={() => dragContext.setDraggedBanner(banner)}>
                        <BannerComponent banner={banner}/>
                    </Button>
                )}
            </div>
        </div>
    );
}