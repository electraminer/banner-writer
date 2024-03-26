import './BannerComponent.css';
// Internal dependencies
import Banner from '../../model/Banner';
// External dependencies
import React from "react";
import SettingsContext from 'frontend/SettingsContext';

export default function BannerComponent({banner}: {banner: Banner}) {
    const settingsContext = React.useContext(SettingsContext);
    const aliasClass = settingsContext.disableAliasing ? "NoAlias" : "Alias"
    return (
        <div className={"BannerComponent " + aliasClass}>
            <img className='BannerComponentBackground'
                src={banner.backgroundLayer().staticImagePath()}/>
            {banner.layers.map((layer, i) =>
                <img key={i} className='BannerComponentLayer'
                    src={layer.staticImagePath()}/>
            )}
        </div>
    )
}