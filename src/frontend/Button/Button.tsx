import './Button.css'
// External dependencies
import React from 'react';

export default function BannerButton({children, onLeftClick, onRightClick}) {
    const onClick = function(e) {
        onLeftClick();
    };

    const onContextMenu = function(e) {
        onRightClick();
        e.preventDefault();
    };

    if (onRightClick == undefined) {
        onRightClick = onLeftClick;
    }

    return (
        <button className='Button' onClick={onClick} onContextMenu={onContextMenu}>
            {children}
        </button>
    );
}