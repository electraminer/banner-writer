import "./WritingComponent.css"
// Internal dependencies
import BannerComponent from "../BannerComponent/BannerComponent"
import Writing from "model/Writing"
// External dependencies
import React from "react"

export default function WritingComponent({writing}: {writing: Writing}) {
    return (
        <div className='WritingComponent'>
            {writing.lines.map((line, i) =>
                <div className='WritingComponentLine' key={i}>
                    {line.map((banner, j) =>
                        (banner ?
                            <BannerComponent banner={banner} key={j}></BannerComponent>
                        :
                            <div className='BannerComponent'>&nbsp;</div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}