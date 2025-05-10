import "./WritingEditor.css"
// Internal dependencies
import WritingContext from "../WritingContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import ActionContext from "frontend/action/ActionContext";
import { Action } from "frontend/action/Action";
// External dependencies
import React from "react";
import DragContext from "../DragContext";
import { produce } from "immer";
import RecentContext from "../RecentContext";

export default function WritingEditor() {
    const writingContext = React.useContext(WritingContext);
    const recentContext = React.useContext(RecentContext);
    const actionContext = React.useContext(ActionContext);
    const dragContext = React.useContext(DragContext);
    
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
                    {line.map((banner, j) =>
                        <>
                            {writingContext.cursor[0] == i && writingContext.cursor[1] == j &&
                                <div className="WritingEditorCursor"/>              
                            }
                            <Button className="WritingEditorBanner"
                                onLeftClick={(isRight) => {
                                    const isForward = isRight != writingContext.writing.rightToLeft;
                                    writingContext.setCursor(i, j + (isForward ? 1 : 0));
                                }}
                                onRightClick={() => actionContext.invoke(Action.SET_BANNER, {banner: banner})}
                                onEndDrag={(isRight) => {
                                    if (dragContext.draggedBanner) {
                                        const isForward = isRight != writingContext.writing.rightToLeft;
                                        writingContext.setWriting(produce(writingContext.writing, writing => {
                                            writing.lines[i].splice(j + (isForward ? 1 : 0), 0, dragContext.draggedBanner);
                                        }));
                                        writingContext.setCursor(i, j + 1 + (isForward ? 1 : 0));
                                        recentContext.addBanner(dragContext.draggedBanner);
                                    }
                                }}>
                                {banner ?
                                    <BannerComponent banner={banner} disableAA={true} key={j}></BannerComponent>
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
                        onLeftClick={() => writingContext.setCursor(i, line.length)}
                        onEndDrag={() => {
                            if (dragContext.draggedBanner) {
                                writingContext.setWriting(produce(writingContext.writing, writing => {
                                    writing.lines[i].push(dragContext.draggedBanner);
                                }));
                                writingContext.setCursor(i, line.length + 1);
                                recentContext.addBanner(dragContext.draggedBanner);
                            }
                        }}>
                        <div/>
                    </Button>
                    <div className="WritingEditorNewline"/>
                </>
            )}
        </div>
    )
}

