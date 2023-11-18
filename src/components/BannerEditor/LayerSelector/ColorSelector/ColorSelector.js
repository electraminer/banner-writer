import './ColorSelector.css';

import Banner from 'model/Banner';

import BannerButton from 'components/BannerButton/BannerButton';
import ColorContext from '../../ColorContext';

import React from 'react';

export default function ColorSelector(props) {
    let colorContext = React.useContext(ColorContext);

    return (
        <div className='ColorSelector'>
            {Array(16).fill(0).map((_, i) => 
                <BannerButton key={i} banner={new Banner(i)}
                    onLeftClick={() => colorContext.setPrimary(i)}
                    onRightClick={() => colorContext.setSecondary(i)}/>
            )}
        </div>
    )
}

