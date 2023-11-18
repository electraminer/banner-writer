import './LayerDisplay.css'

import Banner from 'model/Banner';
import Layer from 'model/Layer';

import ColorContext from '../../ColorContext';
import LayerButton from 'components/LayerButton/LayerButton';
import BannerButton from 'components/BannerButton/BannerButton';

import React from 'react';

export default function LayerDisplay({index, banner, onBannerUpdate}) {
    const colorContext = React.useContext(ColorContext);

    const deleteBanner = new Banner(6,
        new Layer(3, 5),
        new Layer(6, 1));
    const swapBanner = new Banner(8,
        new Layer(3, 29),
        new Layer(3, 36),
        new Layer(3, 30),
        new Layer(8, 6));

    return (
        <div className='LayerDisplay'>
            {(index >= 0) &&
                <LayerButton layer={banner.layers[index]}
                    onLeftClick={() => onBannerUpdate(
                        (b) => b.setLayerColor(index, colorContext.primary))}
                    onRightClick={() => onBannerUpdate(
                        (b) => b.setLayerColor(index, colorContext.secondary))}/>
            }
            <div className='LayerDisplayButtons'>
                {(index > 0) ?
                    <BannerButton banner={swapBanner}
                        onLeftClick={() => onBannerUpdate(
                            (b) => b.swapLayers(index - 1))}/>
                :
                    <BannerButton banner={new Banner(banner.background)}
                        onLeftClick={() => onBannerUpdate(
                            (b) => b.setBackground(colorContext.primary))}
                        onRightClick={() => onBannerUpdate(
                            (b) => b.setBackground(colorContext.secondary))}/>
                }
                {(index >= 0) &&
                    <BannerButton banner={deleteBanner}
                        onLeftClick={() => onBannerUpdate(
                            (b) => b.removeLayer(index))}/>
                }
            </div>
        </div>
    )
}

