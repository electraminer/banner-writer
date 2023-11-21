import "./BannerFontText.css"

import BannerComponent from "components/BannerComponent/BannerComponent"
import Writing from "model/Writing"

export default function BannerFontText({text}) {
    return (
        <div className='BannerFontText'>
            {Writing.fromCharacters(text).map((banner, i) =>
                <BannerComponent banner={banner} key={i}></BannerComponent>
            )}
        </div>
    );
}