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

export default function WritingComponent(props: {writing: Writing}) {
    const writingContext = React.useContext(WritingContext);
    const actionContext = React.useContext(ActionContext);
    
    const dir = props.writing.rightToLeft ? "RightToLeft" : "LeftToRight";

    return (
        <div className={`WritingComponent WritingComponentDirection_${dir}`}>
            {props.writing.lines.map((line, i) =>
                <>
                    {line.map((banner, j) =>
                        <>
                            <Button className="WritingComponentBanner"
                                onLeftClick={() => writingContext.addBanner(banner)}
                                onRightClick={() => actionContext.invoke(Action.SET_BANNER, {banner: banner})}>
                                {banner ?
                                    <BannerComponent banner={banner} key={j}></BannerComponent>
                                :
                                    <div className='BannerComponent'>&nbsp;</div>
                                }
                            </Button>
                        </>
                    )}
                    {line.length == 0 && 
                        <div className="WritingComponentBanner">
                            <div className='BannerComponent'>&nbsp;</div>
                        </div>
                    }
                    <div className="WritingComponentNewline"/>
                </>
            )}
        </div>
    )
}

