import "./TitleBar.css"
// Internal dependencies
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
import html2canvas from "html2canvas";

export default function TitleBar() {

    const actionContext = React.useContext(ActionContext);

    const [optimizedLen, setOptimizedLen] = React.useState("");

    const copyImageLinkHandler = actionContext.useHandler(React.useRef(), Action.COPY_IMAGE_LINK);
    const copyImageHandler = actionContext.useHandler(React.useRef(), Action.COPY_IMAGE)
    const copyAnvilHandler = actionContext.useHandler(React.useRef(), Action.COPY_ANVIL);
    const copyUnicodeHandler = actionContext.useHandler(React.useRef(), Action.COPY_UNICODE);
    const copyCommandHandler = actionContext.useHandler(React.useRef(), Action.COPY_COMMAND);
    const pasteSmartHandler = actionContext.useHandler(React.useRef(), Action.PASTE_SMART);
    const updateOptimizeLenHandler = actionContext.useHandler(React.useRef(), Action.UPDATE_OPTIMIZE_LEN);
    React.useEffect(() => {
        copyImageLinkHandler((params, invoke) => navigator.clipboard.writeText(
            `https://banner-writer.web.app${params.writing.imagePath()}`
        ))
        copyImageHandler(async (params, invoke) => {
            const response = await fetch(params.writing.imagePath());
            const blob = await response.blob();
            if (navigator.clipboard.write == undefined) {
                if (navigator.userAgent.toLowerCase().includes('firefox')) {
                    alert("To allow copying images to clipboard, you must change your Firefox settings.\n\
                    Here are some steps to fix this issue:\n\
                    1) Navigate to the url 'about:config'.\n\
                    2) Click 'Accept the Risk and Continue'.\n\
                    3) Type 'dom.events.asyncClipboard.clipboardItem' in the box.\n\
                    4) Click the button with the two-arrows symbol to the right.\n\
                    5) The value in the middle should now appear as 'true'.\n\
                    6) Return to banner-writer and reload the page.")
                } else {
                    alert("Copying images to your clipboard is unsupported for an unknown reason.\n\
                    Contact Electra with information about your browser to get this fixed.")
                }
                
            } else {
                navigator.clipboard.write([new window.ClipboardItem(
                    { [blob.type]: blob }
                )])
            }
        })
        copyAnvilHandler((params, invoke) => navigator.clipboard.writeText(
            params.writing.toOptimizedString()
        ))
        copyUnicodeHandler((params, invoke) => navigator.clipboard.writeText(
            params.writing.toString()
        ))
        copyCommandHandler((params, invoke) => navigator.clipboard.writeText(
            params.writing.toCommandCode()
        ))
        pasteSmartHandler((params, invoke) => {
            const str = navigator.clipboard.read().toString();

            try {
                // If string was a banner code, set the banner
                invoke(Action.ADD_BANNER, {banner: Banner.fromCode(str)[0]});
            } catch (e) {
                // Otherwise set the writing by parsing the string
                invoke(Action.ADD_WRITING, {writing: Writing.fromStringSmart(str)});
            }
            
        })
        updateOptimizeLenHandler((params, invoke) => {

            const optimized = params.writing.toOptimizedString();
            let optimizedLen = optimized.length.toString();
            if (optimizedLen.length == 1) {
                optimizedLen = " " + optimizedLen;
            }
            setOptimizedLen(optimizedLen);
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
        actionContext.invoke(Action.ADD_WRITING, {writing, cursor: {}});
    }, [])

    return (
        <div className="TitleBar">
            <Text text="BANNER-WRITER"/>
            <a href="/about">
                <Text text="ABOUT" backgroundColor={Color.PURPLE} length={5}/>
            </a>
            <a href="/cfg">
                <Text text="CFG" backgroundColor={Color.BROWN} length={5}/>
            </a>

            {/* The writing direction toggle button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.TOGGLE_DIRECTION)}>
                <Text text={
                    localStorage.defaultRightToLeft ? "L<--R" : "L-->R"
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
                onLeftClick={() => actionContext.invoke(Action.COPY_IMAGE_LINK)}>
                <Text text="LINK" backgroundColor={Color.LIGHT_BLUE} length={5}/>
            </Button>
            {/* The image copy button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.COPY_IMAGE)}>
                <Text text="IMAGE" backgroundColor={Color.CYAN} length={5}/>
            </Button>
            {/* The anvil text copy button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.COPY_ANVIL)}>
                <Text text="ANVIL" backgroundColor={Color.ORANGE} length={5}/>
                <div className="TitleBarDropdown">
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
                <Text text="RAW" backgroundColor={Color.LIME} length={5}/>
            </Button>
            {/* The text paste button. */}
            <Button
                onLeftClick={() => actionContext.invoke(Action.PASTE_SMART)}>
                <Text text="PASTE" backgroundColor={Color.LIGHT_BLUE} length={5}/>
            </Button>
        </div>
    )
}