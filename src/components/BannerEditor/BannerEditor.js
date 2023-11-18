

import './BannerEditor.css'

import LayerStack from './LayerStack/LayerStack';
import LayerSelector from './LayerSelector/LayerSelector';
import {ColorContextProvider} from './ColorContext';

import React from 'react';

export default function BannerEditor({banner, onBannerUpdate}) {
    return (
        <ColorContextProvider>
            <div className='BannerEditor'>
                <div className='BannerEditorLayerSelector ForceSize'>
                    <LayerSelector
                        onLayerSelected={(layer) => onBannerUpdate(
                            (b) => b.addLayer(layer))}/>
                </div>
                <div className='BannerEditorLayerStack ForceSize'>
                    <LayerStack banner={banner} onBannerUpdate={onBannerUpdate}/>
                </div>
            </div>
        </ColorContextProvider>
    )
}

