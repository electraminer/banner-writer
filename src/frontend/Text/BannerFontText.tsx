import "./BannerFontText.css"
// Internal dependencies
import BannerComponent from "../Banner/BannerComponent"
import Writing from "model/Writing"
// External dependencies
import React from "react"

export default function BannerFontText({writing}: {writing: Writing}) {
    return (
        <div className='BannerFontText'>
            {writing.lines.map((line, i) =>
                <div className='BannerFontLine' key={i}>
                    {line.map((banner, j) =>
                        (banner ?
                            <BannerComponent banner={banner} key={j}></BannerComponent>
                        :
                            <div className='BannerComponent'/>
                        )
                    )}
                </div>
            )}
        </div>
    );
}