import "./WritingEditor.css"
// Internal dependencies
import WritingContext from "../WritingContext";
import BannerContext from "../BannerContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
// External dependencies
import React from "react";

export default function WritingEditor() {
    const writingContext = React.useContext(WritingContext);
    const bannerContext = React.useContext(BannerContext);
    
    const dir = writingContext.writing.rightToLeft ? "RightToLeft" : "LeftToRight";
    let size = writingContext.writing.lines.length;
    let increased = true;
    while (increased) {
        increased = false;
        for (let line of writingContext.writing.lines) {
            if (line.length >= 16 * size) {
                size += 1;
                increased = true;
                break;
            }
        }
    }
    if (size > 4) {
        size = 4;
    }

    return (
        <div className={`WritingEditor WritingEditorDirection_${dir} WritingEditorSize_${size}`}>
            {writingContext.writing.lines.map((line, i) =>
                <>
                    {/* <div className='WritingEditorLine' key={i}> */}
                    {line.map((banner, j) =>
                        <>
                            {writingContext.cursor[0] == i && writingContext.cursor[1] == j &&
                                <div className="WritingEditorCursor"/>              
                            }
                            <Button className="WritingEditorBanner"
                                onLeftClick={() => writingContext.setCursor(i, j)}
                                onRightClick={() => bannerContext.setBanner(banner)}>
                                {banner ?
                                    <BannerComponent banner={banner} key={j}></BannerComponent>
                                :
                                    <div className='BannerComponent'>&nbsp;</div>
                                }
                            </Button>
                        </>
                    )}
                    {writingContext.cursor[0] == i && writingContext.cursor[1] == line.length &&
                        <div className="WritingEditorCursor"/>   
                    }
                    <Button className="WritingEditorCursorEndHitbox"
                        onLeftClick={() => writingContext.setCursor(i, line.length)}>
                        <div/>
                    </Button>
                    <div className="WritingEditorNewline"/>
                    {/* </div> */}
                </>
            )}
        </div>
    )
}

