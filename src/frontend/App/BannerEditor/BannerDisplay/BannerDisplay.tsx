import "./BannerDisplay.css"
// Internal dependencies
import WritingContext from "../../WritingContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Text from "frontend/Text/Text";
import ActionContext from "frontend/action/ActionContext";
import { Action } from "frontend/action/Action";
import Banner from "model/Banner";
import Color from "model/Color";
// External dependencies
import React from "react";

export default function BannerDisplay(props: {banner: Banner}) {
    const writingContext = React.useContext(WritingContext);
    // JANKY FIX - Will remove Writing Context in the future
    const wcRef = React.useRef(writingContext);
    wcRef.current = writingContext;

    const actionContext = React.useContext(ActionContext);

    const addBannerHandler = actionContext.useHandler(React.useRef(), Action.ADD_BANNER);
    const addSpaceHandler = actionContext.useHandler(React.useRef(), Action.ADD_SPACE);
    const addLineHandler = actionContext.useHandler(React.useRef(), Action.ADD_LINE);
    const backspaceHandler = actionContext.useHandler(React.useRef(), Action.BACKSPACE);
    const addClearBannerHandler = actionContext.useHandler(React.useRef(), Action.ADD_CLEAR_BANNER);
    const backspaceSelectHandler = actionContext.useHandler(React.useRef(), Action.BACKSPACE_SELECT);
    React.useEffect(() => {
        addBannerHandler(params => wcRef.current.addBanner(params.banner))
        addSpaceHandler(params => wcRef.current.addSpace())
        addLineHandler(params => wcRef.current.addLine())
        backspaceHandler(params => wcRef.current.backspace())
        addClearBannerHandler(params => wcRef.current.addBanner(params.banner))
        backspaceSelectHandler((params, invoke) => {
            const banner = wcRef.current.backspace();
            if (banner) {
                invoke(Action.SET_BANNER, {banner: banner});
            }
        })
    }, [])

    return (
        <div className="BannerDisplay">
            <Button
                onLeftClick={() => actionContext.invoke(Action.ADD_BANNER, {banner: props.banner})}
                onRightClick={() => actionContext.invoke(Action.BACKSPACE)}>
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

