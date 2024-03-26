import './BannerComponent.css';
// Internal dependencies
import Banner from '../../model/Banner';
// External dependencies
import React from "react";
import SettingsContext from 'frontend/SettingsContext';

export default function BannerComponent(props: {banner: Banner, disableAA?: boolean}) {
    props.disableAA ??= false;
    const aliasClass = props.disableAA ? "DisableAA" : "EnableAA"
    return (
        <div className={"BannerComponent " + aliasClass}>
            <img className='BannerComponentBackground'
                src={props.banner.backgroundLayer().staticImagePath()}/>
            {props.banner.layers.map((layer, i) =>
                <img key={i} className='BannerComponentLayer'
                    src={layer.staticImagePath()}/>
            )}
        </div>
    )
}