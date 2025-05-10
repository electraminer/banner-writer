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

export default function WritingComponent(props: {
        writing: Writing,
        setWriting: (writing: Writing) => void,
    }) {
    const writingContext = React.useContext(WritingContext);
    const actionContext = React.useContext(ActionContext);
    const dragContext = React.useContext(DragContext);
    const recentContext = React.useContext(RecentContext);
    
    const dir = props.writing.rightToLeft ? "RightToLeft" : "LeftToRight";

    return (
        <div className={`WritingComponent WritingComponentDirection_${dir}`}>
            {props.writing.lines.map((line, i) =>
                <>
                    {line.map((banner, j) =>
                        <>
                            <Button className="WritingComponentBanner"
                                onLeftClick={() => writingContext.addBanner(banner)}
                                onRightClick={() => actionContext.invoke(Action.SET_BANNER, {banner: banner})}
                                onEndDrag={(isRight) => {
                                    if (dragContext.draggedBanner) {
                                        const isForward = isRight != props.writing.rightToLeft;
                                        props.setWriting(produce(props.writing, writing => {
                                            writing.lines[i].splice(j + (isForward ? 1 : 0), 0, dragContext.draggedBanner);
                                        }));
                                        recentContext.addBanner(dragContext.draggedBanner);
                                    }
                                }}>
                                {banner ?
                                    <BannerComponent banner={banner} key={j}></BannerComponent>
                                :
                                    <Button className='BannerComponent'
                                        onLeftClick={() => 0}
                                        onEndDrag={(isRight) => {
                                            if (dragContext.draggedBanner) {
                                                const isForward = isRight != props.writing.rightToLeft;
                                                props.setWriting(produce(props.writing, writing => {
                                                    writing.lines[i].splice(j + (isForward ? 1 : 0), 0, dragContext.draggedBanner);
                                                }));
                                                recentContext.addBanner(dragContext.draggedBanner);
                                            }
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
                            if (dragContext.draggedBanner) {
                                props.setWriting(produce(props.writing, writing => {
                                    writing.lines[i].push(dragContext.draggedBanner);
                                }));
                                recentContext.addBanner(dragContext.draggedBanner);
                            }
                        }}>
                        <div/>
                    </Button>
                    <div className="WritingComponentNewline"/>
                </>
            )}
        </div>
    )
}

