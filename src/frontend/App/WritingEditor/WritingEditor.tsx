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
import SavedContext from "../SavedContext";

export default function WritingEditor() {
    const writingContext = React.useContext(WritingContext);
    const recentContext = React.useContext(RecentContext);
    const actionContext = React.useContext(ActionContext);
    const savedContext = React.useContext(SavedContext);
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

    function dragInBanner(line: number, cursor: number) {
        if (dragContext.draggedBanner) {
            writingContext.setWriting(produce(writingContext.writing, writing => {
                if (dragContext.index === savedContext.selected) {
                    writing.lines[dragContext.line].splice(dragContext.cursor, 1);
                    if (line == dragContext.line && cursor > dragContext.cursor) {
                        cursor--;
                    }
                }
                writing.lines[line].splice(cursor, 0, dragContext.draggedBanner);
            }));
            writingContext.setCursor(line, cursor + 1);
            recentContext.addBanner(dragContext.draggedBanner);
        }
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
                                onBeginDrag={() => {
                                    if (banner) {
                                        dragContext.setDraggedBanner(banner, savedContext.selected, i, j);
                                    }
                                }}
                                onEndDrag={(isRight) => {
                                    const isForward = isRight != writingContext.writing.rightToLeft;
                                    dragInBanner(i, j + (isForward ? 1 : 0));
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
                            dragInBanner(i, line.length);
                        }}>
                        <div/>
                    </Button>
                    <div className="WritingEditorNewline"/>
                </>
            )}
        </div>
    )
}

