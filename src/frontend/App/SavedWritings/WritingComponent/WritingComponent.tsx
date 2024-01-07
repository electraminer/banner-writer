import "./WritingComponent.css"
// Internal dependencies
import WritingContext from "../../WritingContext";
import BannerContext from "../../BannerContext";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import Writing from "model/Writing";
// External dependencies
import React from "react";

export default function WritingComponent(props: {writing: Writing}) {
    const writingContext = React.useContext(WritingContext);
    const bannerContext = React.useContext(BannerContext);
    
    const dir = props.writing.rightToLeft ? "RightToLeft" : "LeftToRight";

    return (
        <div className={`WritingComponent WritingComponentDirection_${dir}`}>
            {props.writing.lines.map((line, i) =>
                <>
                    {line.map((banner, j) =>
                        <>
                            <Button className="WritingComponentBanner"
                                onLeftClick={() => writingContext.addBanner(banner)}
                                onRightClick={() => bannerContext.setBanner(banner)}>
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

