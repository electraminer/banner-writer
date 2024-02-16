import "./TitleBar.css"
// Internal dependencies
import WritingContext from "../WritingContext";
import SettingsContext from "../../SettingsContext";
import Text from "frontend/Text/Text";
import Button from "frontend/Button/Button";
import ActionContext from "frontend/action/ActionContext";
import { Action } from "frontend/action/Action";
import Writing from "model/Writing";
import Banner from "model/Banner";
import Color from "model/Color";
// External dependencies
import React from "react";

export default function TitleBar() {
    const settingsContext = React.useContext(SettingsContext);
    const writingContext = React.useContext(WritingContext);
    const actionContext = React.useContext(ActionContext);

    const optimized = writingContext.writing.toOptimizedString();
    let optimizedLen = optimized.length as string;
    if (optimizedLen.length == 1) {
        optimizedLen = " " + optimizedLen;
    }

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const str = urlParams.get('writing');

        if (!str) {
            return;
        }
        writingContext.setWriting(Writing.fromString(str)[0]);
    }, [])

    return (
        <div className="TitleBar">
            <Text text="BANNER-WRITER"/>
            <a href="/about">
                <Text text="ABOUT" backgroundColor={Color.PURPLE} length={5}/>
            </a>
            <Button
                onLeftClick={() => settingsContext.setUseBannerFont(
                    !settingsContext.useBannerFont
                )}>
                <Text text={"FONT"} backgroundColor={Color.BROWN} length={5}/>
            </Button>
            {/* The writing direction toggle button. */}
            <Button
                onLeftClick={() => writingContext.updateWriting((writing: Writing) => {
                    writing.rightToLeft = !writing.rightToLeft;
                })}>
                <Text text={
                    writingContext.writing.rightToLeft ? "L<--R" : "L-->R"
                 } backgroundColor={Color.YELLOW} length={5}/>
            </Button>
            <div className="TitleBarSpacer"/>
            {/* The image copy button. */}
            <Button
                onLeftClick={() => navigator.clipboard.writeText(
                    `https://banner-writer.web.app${writingContext.writing.imagePath()}`
                )}>
                <Text text="IMAGE" backgroundColor={Color.CYAN} length={5}/>
            </Button>
            {/* The anvil text copy button. */}
            <Button
                onLeftClick={() => navigator.clipboard.writeText(optimized)}>
                <Text text="ANVIL" backgroundColor={Color.ORANGE} length={5}/>
                <div className="TitleBarAnvilDetails">
                    <Text text={` ${optimizedLen}/50`}/>
                </div>
            </Button>
            {/* The text copy button. */}
            <Button
                onLeftClick={() => navigator.clipboard.writeText(
                    writingContext.writing.toString()
                )}>
                <Text text="COPY" backgroundColor={Color.LIME} length={5}/>
            </Button>
            {/* The text paste button. */}
            <Button
                onLeftClick={() => {
                    const str = prompt("Insert banner-font writing");
                    if (!str) {
                        return;
                    }
                    writingContext.setWriting(
                        Writing.fromString(str)[0]);

                }}>
                <Text text="PASTE" backgroundColor={Color.LIGHT_BLUE} length={5}/>
            </Button>
            
            {/* The code paste button. */}
            <Button
                onLeftClick={() => {
                    const str = prompt("Insert code from /getbannercode");
                    if (!str) {
                        return;
                    }
                    actionContext.invoke(Action.SET_BANNER, {banner: Banner.fromCode(str)[0]});
                }}>
                <Text text="CODE" backgroundColor={Color.GREEN} length={5}/>
            </Button>
        </div>
    )
}