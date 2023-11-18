import './LayerStack.css'

import LayerDisplay from './LayerDisplay/LayerDisplay';

import React from 'react';

export default function LayerStack({banner, onBannerUpdate}) {
    return (
        <div className='LayerStack'>
            {banner.layers.map((layer, i) =>
                <LayerDisplay key={i} index={i}
                    banner={banner} onBannerUpdate={onBannerUpdate}/>
            )}
            {banner.layers.length == 0 &&
                <LayerDisplay index={-1}
                    banner={banner} onBannerUpdate={onBannerUpdate}/>
            }
        </div>
    )
}

