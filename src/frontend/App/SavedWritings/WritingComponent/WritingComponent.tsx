import "./WritingComponent.css"
// Internal dependencies
import WritingContext from "../../WritingContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import { Action } from "frontend/action/Action";
import ActionContext from "frontend/action/ActionContext";
import Writing from "model/Writing";
// External dependencies
import React from "react";
import { produce } from "immer";
import DragContext from "frontend/App/DragContext";
import RecentContext from "frontend/App/RecentContext";
import SavedContext from "frontend/App/SavedContext";

export default function WritingComponent(props: {
        writing: Writing,
        index: number,
        setWriting: (writing: Writing) => void,
    }) {
    const writingContext = React.useContext(WritingContext);
    const actionContext = React.useContext(ActionContext);
    const dragContext = React.useContext(DragContext);
    const recentContext = React.useContext(RecentContext);
    const savedContext = React.useContext(SavedContext);
    
    const dir = props.writing.rightToLeft ? "RightToLeft" : "LeftToRight";

    function moveBannerIntoPosition(line: number, cursor: number) {
        if (dragContext.draggedBanner) {
            savedContext.updateSaved(saved => {
                // giga jank - this should be done with an action but i can't be bothered currently
                if (dragContext.index !== null && dragContext.index !== props.index) {
                    const writing = Writing.fromString(saved[dragContext.index])[0];
                    writing.lines[dragContext.line].splice(dragContext.cursor, 1);
                    if (dragContext.index === savedContext.selected) {
                        writingContext.setWriting(writing);
                    }
                    saved[dragContext.index] = writing.toString();
                }
                const writing = Writing.fromString(saved[props.index])[0];
                if (dragContext.index === props.index) {
                    writing.lines[dragContext.line].splice(dragContext.cursor, 1);
                    if (line == dragContext.line && cursor > dragContext.cursor) {
                        cursor--;
                    }
                }
                writing.lines[line].splice(cursor, 0, dragContext.draggedBanner);
                if (props.index === savedContext.selected) {
                    writingContext.setWriting(writing);
                }
                saved[props.index] = writing.toString();
            })

            recentContext.addBanner(dragContext.draggedBanner);
        }
    }

    return (
        <div className={`WritingComponent WritingComponentDirection_${dir}`}>
            {props.writing.lines.map((line, i) =>
                <>
                    {line.map((banner, j) =>
                        <>
                            <Button className="WritingComponentBanner"
                                onLeftClick={() => writingContext.addBanner(banner)}
                                onRightClick={() => actionContext.invoke(Action.SET_BANNER, {banner: banner})}
                                onBeginDrag={() => dragContext.setDraggedBanner(banner, props.index, i, j)}
                                onEndDrag={(isRight) => {
                                    const isForward = isRight != props.writing.rightToLeft;
                                    moveBannerIntoPosition(i, j + (isForward ? 1 : 0))
                                }}>
                                {banner ?
                                    <BannerComponent banner={banner} key={j}></BannerComponent>
                                :
                                    <Button className='BannerComponent'
                                        onLeftClick={() => 0}
                                        onEndDrag={(isRight) => {
                                            const isForward = isRight != props.writing.rightToLeft;
                                            moveBannerIntoPosition(i, j + (isForward ? 1 : 0))
                                        }}>
                                        &nbsp;
                                    </Button>
                                }
                            </Button>
                        </>
                    )}
                    {line.length == 0 && 
                        <div className="WritingComponentBanner">
                            <div className='BannerComponent'>&nbsp;</div>
                        </div>
                    }
                    <Button className="WritingComponentCursorEndHitbox"
                        onLeftClick={() => 0}
                        onEndDrag={() => {
                            moveBannerIntoPosition(i, line.length)
                        }}>
                        <div/>
                    </Button>
                    <div className="WritingComponentNewline"/>
                </>
            )}
        </div>
    )
}

