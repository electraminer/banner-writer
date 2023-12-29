// const anvilNumbers = [
//     "󏿷󏿷󏿷󏿷󏿷󏿷",
//     "󏿷󏿷󏿷󏿷",
//     "󏿷󏿷󏿷󏿷󏿷",
//     "󏿷󏿷󏿷󏿷󏿷󏿷",
//     "󏿷󏿷󏿷󏿷󏿷",
//     "󏿷󏿷󏿷󏿷󏿷",
//     "󏿷󏿷󏿷󏿷󏿷󏿷",
//     "󏿷󏿷󏿷",
//     "󏿷󏿷󏿷󏿷󏿷󏿷",
//     "󏿷󏿷󏿷󏿷󏿷󏿷",
// ];
// const createNumber = function(string) {
//     let characters = "";
//     for (const char of string) {
//         characters += anvilNumbers[char.charCodeAt(0) - 0x30];
//     }
//     return characters;
// }

/* <BannerFontText writing={
                    Writing.fromString("￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷")[0]
                }/>
                <a href="https://banner-writer.web.app/about">
                    <BannerFontText text="󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"/>
                </a>
                <div className="AppHeaderSpacer"/>
                <button
                    onClick={() => writingContext.updateWriting(
                        (w) => w.backspace())}>
                    <BannerFontText text="󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"/>
                </button>
                <button
                    onClick={async () => {
                        const canvas = await html2canvas(screenshotRef.current);
                        console.log(canvas);
                        const blob = await new Promise(resolve => canvas.toBlob(resolve));
                        if (navigator.clipboard.write == undefined) {
                            if (navigator.userAgent.toLowerCase().includes("firefox")) {
                                alert("To allow copying images to clipboard, you must change your Firefox settings.\n\
                                Here are some steps to fix this issue:\n\
                                1) Navigate to the url "about:config".\n\
                                2) Click "Accept the Risk and Continue".\n\
                                3) Type "dom.events.asyncClipboard.clipboardItem" in the box.\n\
                                4) Click the button with the two-arrows symbol to the right.\n\
                                5) The value in the middle should now appear as "true".\n\
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
                    }}>
                    <BannerFontText text="󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"/>
                </button>
                <button
                    onClick={() => writingContext.updateWriting(
                        (w) => {w.rightToLeft = !w.rightToLeft})}>
                    {writingContext.writing.rightToLeft ?
                        <BannerFontText text="￷￷￷￷￷￷￷￷￷￷￷￷￷"/>
                    :
                        <BannerFontText text="￷￷￷￷￷￷￷￷￷￷￷￷￷"/>
                    }
                </button>
                <button
                    onClick={() => navigator.clipboard.writeText(writingContext.writing.characters())}>
                    <BannerFontText text="󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"/>
                </button>
                <button
                    onClick={() => writingContext.updateWriting(
                        (w) => {
                            const characters = prompt("Insert banner-font writing");
                            if (characters) {
                                w.banners = Writing.fromCharacters(characters, w.rightToLeft);
                            }
                        })}>
                    <BannerFontText text="￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷"/>
                </button>
                <button
                    onClick={() => navigator.clipboard.writeText(writingContext.writing.optimizedCharacters())}>
                    <BannerFontText text="󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"/>
                    <div className="AppAnvilDetails">
                        <BannerFontText text=""/>
                        <BannerFontText text={createNumber(
                            Math.min(writingContext.writing.optimizedCharacters().length, 99)
                                .toString().padStart(2, "0"))}/>
                        <BannerFontText text="󏿷󏿷"/>
                        <BannerFontText text={createNumber("50")}/>
                    </div>
                </button> */