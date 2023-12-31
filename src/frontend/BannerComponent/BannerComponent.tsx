import './BannerComponent.css';
// Internal dependencies
import Banner from '../../model/Banner';
// External dependencies
import React from "react";

export default function BannerComponent({banner}: {banner: Banner}) {
    return (
        <div className='BannerComponent'>
            <img className='BannerComponentBackground'
                src={banner.backgroundLayer().staticImagePath()}/>
            {banner.layers.map((layer, i) =>
                <img key={i} className='BannerComponentLayer'
                    src={layer.staticImagePath()}/>
            )}
        </div>
    )
}