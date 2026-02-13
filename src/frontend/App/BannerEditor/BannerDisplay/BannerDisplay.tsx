import "./BannerDisplay.css"
// Internal dependencies
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Text from "frontend/Text/Text";
import ActionContext from "frontend/action/ActionContext";
import { Action } from "frontend/action/Action";
import Banner from "model/Banner";
import Color from "model/Color";
// External dependencies
import React from "react";
import DragContext from "frontend/App/DragContext";
import Writing from "model/Writing";

export default function BannerDisplay(props: {banner: Banner}) {
    const actionContext = React.useContext(ActionContext);
    const dragContext = React.useContext(DragContext);

    return (
        <div className="BannerDisplay">
            <Button
                onLeftClick={() => actionContext.invoke(Action.ADD_BANNER, {banner: props.banner})}
                onRightClick={() => actionContext.invoke(Action.BACKSPACE)}
                onBeginDrag={() => dragContext.setDraggedBanner(props.banner)}
                onEndDrag={() => {
                    if (dragContext.draggedBanner) {
                        actionContext.invoke(Action.SET_BANNER, {banner: dragContext.draggedBanner});
                    }
                }}>
                <BannerComponent banner={props.banner} disableAA={true}/>
            </Button>
            <div className="BannerDisplayControls">
                <div className="BannerDisplaySpacer"/>
                <Button
                    onLeftClick={() => actionContext.invoke(Action.ADD_BANNER, {banner: props.banner})}
                    onRightClick={() => actionContext.invoke(Action.ADD_CLEAR_BANNER, {banner: props.banner})}>
                    <Text backgroundColor={Color.LIME} text="ADD BANNER" length={10}/>
                </Button>
                <div className="BannerDisplaySpacer"/>
                <Button
                    onLeftClick={() => actionContext.invoke(Action.ADD_SPACE)}>
                    <Text backgroundColor={Color.LIGHT_BLUE} text="ADD SPACE" length={10}/>
                </Button>
                <div className="BannerDisplaySpacer"/>
                <Button
                    onLeftClick={() => actionContext.invoke(Action.ADD_LINE)}>
                    <Text backgroundColor={Color.YELLOW} text="ADD LINE" length={10}/>
                </Button>
                <div className="BannerDisplaySpacer"/>
                <Button
                    onLeftClick={() => actionContext.invoke(Action.BACKSPACE)}
                    onRightClick={() => actionContext.invoke(Action.BACKSPACE_SELECT)}>
                    <Text backgroundColor={Color.RED} text="BACKSPACE" length={10}/>
                </Button>
            </div>
        </div>
    )
}

