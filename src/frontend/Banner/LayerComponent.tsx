// Internal dependencies
import Color from '../../model/Color';
import Layer from '../../model/Layer';
import Banner from '../../model/Banner';
import BannerComponent from './BannerComponent';
// External dependencies
import React from "react";

export const LAYER_COMP_LIGHT_COLORS = [
    Color.WHITE,
    Color.LIGHT_GRAY,
    Color.YELLOW,
    Color.ORANGE,
    Color.LIME,
    Color.LIGHT_BLUE,
    Color.CYAN,
    Color.PINK,
    Color.MAGENTA,
];

export const LAYER_COMP_LIGHT_BACKGROUND = Color.LIGHT_GRAY;
export const LAYER_COMP_DARK_BACKGROUND = Color.GRAY;

export default function LayerButton({layer}: {layer: Layer}) {
    const background = (LAYER_COMP_LIGHT_COLORS.includes(layer.color) ?
        LAYER_COMP_DARK_BACKGROUND
    :
        LAYER_COMP_LIGHT_BACKGROUND
    );
    const banner = new Banner(background, layer);

    return (
        <BannerComponent banner={banner}/>
    );
}