import './PatternSelector.css';

import Layer from 'model/Layer';
import LayerButton from 'components/LayerButton/LayerButton';
import ColorContext from '../../ColorContext';

import React from 'react';

export default function PatternSelector({onLayerSelected}) {
    const colorContext = React.useContext(ColorContext);

    return (
        <div className='PatternSelector'>{
            Array(40).fill(0).map((_, i) => {
                const layer = new Layer(colorContext.primary, i + 1);
                const secondaryLayer = new Layer(colorContext.secondary, i + 1);
                return <LayerButton key={i} layer={layer}
                    onLeftClick={() => onLayerSelected(layer)}
                    onRightClick={() => onLayerSelected(secondaryLayer)}/>
            })
        }</div>
    )
}

