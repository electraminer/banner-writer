import './ForceSize.css';

import React from 'react';

export default function ForceSize({className, children}) {
    const ref = React.useRef(null);

    React.useEffect(() => {
        ref.current.style.width = null;
        ref.current.style.height = null;
        const style = window.getComputedStyle(ref.current);
        const [numerator, denominator] = style.aspectRatio.split('/');
        const aspectRatio = numerator / denominator;
        if (style.width == '0px') {
            ref.current.style.width = (ref.current.clientHeight * aspectRatio) + 'px';
        }
        if (style.height == '0px') {
            ref.current.style.height = (ref.current.clientWidth / aspectRatio) + 'px';
        }
    })

    return (
        <div className={className + ' ForceSize'} ref={ref}>
            {children}
        </div>
    )
}