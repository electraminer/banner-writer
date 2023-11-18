import './LayerSelector.css'

import PatternSelector from './PatternSelector/PatternSelector';
import ColorSelector from './ColorSelector/ColorSelector';
import ColorDisplay from './ColorDisplay/ColorDisplay';

export default function LayerSelector({onLayerSelected}) {
    return (
        <div className='LayerSelector'>
            <div className='LayerSelectorColorRow'>
                <ColorDisplay/>
                <ColorSelector/>
            </div>
            <PatternSelector onLayerSelected={onLayerSelected}/>
        </div>
    )
}

