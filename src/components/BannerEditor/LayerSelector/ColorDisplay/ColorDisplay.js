import './ColorDisplay.css';

import Banner from 'model/Banner';

import BannerButton from 'components/BannerButton/BannerButton';
import ColorContext from '../../ColorContext';

import React from 'react';

export default function ColorDisplay({}) {
    let colorContext = React.useContext(ColorContext);

    return (
        <div className='ColorDisplay'>
            <BannerButton banner={new Banner(colorContext.primary)}
                onLeftClick={colorContext.swap} onRightClick={colorContext.swap}/>
            <BannerButton banner={new Banner(colorContext.secondary)}
                onLeftClick={colorContext.swap} onRightClick={colorContext.swap}/>
        </div>
    );
}