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
    // JANKY FIX - Will remove Writing Context in the future
    const wcRef = React.useRef(writingContext);
    wcRef.current = writingContext;

    const actionContext = React.useContext(ActionContext);

    const optimized = writingContext.writing.toOptimizedString();
    let optimizedLen = optimized.length as string;
    if (optimizedLen.length == 1) {
        optimizedLen = " " + optimizedLen;
    }

    const toggleDirectionHandler = actionContext.useHandler(React.useRef(), Action.TOGGLE_DIRECTION);
    const clearWritingHandler = actionContext.useHandler(React.useRef(), Action.CLEAR_WRITING);
    const copyImageHandler = actionContext.useHandler(React.useRef(), Action.COPY_IMAGE);
    const copyAnvilHandler = actionContext.useHandler(React.useRef(), Action.COPY_ANVIL);
    const copyUnicodeHandler = actionContext.useHandler(React.useRef(), Action.COPY_UNICODE);
    const copyCommandHandler = actionContext.useHandler(React.useRef(), Action.COPY_COMMAND);
    const pasteCodeHandler = actionContext.useHandler(React.useRef(), Action.PASTE_CODE);
    const pasteUnicodeHandler = actionContext.useHandler(React.useRef(), Action.PASTE_UNICODE);
    React.useEffect(() => {
        toggleDirectionHandler((params, invoke) => wcRef.current.updateWriting((writing: Writing) => {
            writing.rightToLeft = !writing.rightToLeft;
        }))
        clearWritingHandler((params, invoke) => confirm("Are you sure you want to clear the writing?") ?
            wcRef.current.setWriting(wcRef.current.defaultWriting, true) : undefined)
        copyImageHandler((params, invoke) => navigator.clipboard.writeText(
            `https://banner-writer.web.app${wcRef.current.writing.imagePath()}`
        ))
        copyAnvilHandler((params, invoke) => navigator.clipboard.writeText(
            wcRef.current.writing.toOptimizedString()
        ))
        copyUnicodeHandler((params, invoke) => navigator.clipboard.writeText(
            wcRef.current.writing.toString()
        ))
        copyCommandHandler((params, invoke) => navigator.clipboard.writeText(
            wcRef.current.writing.toCommandCode()
        ))
        pasteUnicodeHandler((params, invoke) => {
            const str = prompt("Insert banner-font writing");
            if (!str) {
                return;
            }
            wcRef.current.setWriting(Writing.fromString(str)[0]);
        })
        pasteCodeHandler((params, invoke) => {
            const str = prompt("Insert code from /getbannercode");
            if (!str) {
                return;
            }
            invoke(Action.SET_BANNER, {banner: Banner.fromCode(str)[0]});
        })
    }, [])


    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const str = urlParams.get('writing');

        if (!str) {
            return;
        }
        let writing = undefined;
        try {
            // First try to use the new URL Safe encoding.
            writing = Writing.fromUrlSafe(str);
        } catch (_) {
            // If not, try the old BannerFont encoding for backwards compatibility.
            [writing] = Writing.fromString(str);
        }
        writingContext.setWriting(writing);
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
                onLeftClick={() => actionContext.invoke(Action.TOGGLE_DIRECTION)}>
                <Text text={
                    writingContext.writing.rightToLeft ? "L<--R" : "L-->R"
                 } backgroundColor={Color.YELLOW} length={5}/>
            </Button>
            {/* The clear writing button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.CLEAR_WRITING)}>
                <Text text="CLEAR" backgroundColor={Color.RED} length={5}/>
            </Button>
            <div className="TitleBarSpacer"/>
            {/* The image copy button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.COPY_IMAGE)}>
                <Text text="IMAGE" backgroundColor={Color.CYAN} length={5}/>
            </Button>
            {/* The anvil text copy button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.COPY_ANVIL)}>
                <Text text="ANVIL" backgroundColor={Color.ORANGE} length={5}/>
                <div className="TitleBarAnvilDetails">
                    <Text text={` ${optimizedLen}/50`}/>
                </div>
            </Button>
            {/* The command copy button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.COPY_COMMAND)}>
                <Text text="CMD" backgroundColor={Color.PINK} length={5}/>
            </Button>
            {/* The text copy button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.COPY_UNICODE)}>
                <Text text="COPY" backgroundColor={Color.LIME} length={5}/>
            </Button>
            {/* The text paste button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.PASTE_UNICODE)}>
                <Text text="PASTE" backgroundColor={Color.LIGHT_BLUE} length={5}/>
            </Button>
            
            {/* The code paste button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.PASTE_CODE)}>
                <Text text="CODE" backgroundColor={Color.GREEN} length={5}/>
            </Button>
        </div>
    )
}