import './BannerButton.css'

import BannerComponent from 'components/BannerComponent/BannerComponent';

export default function BannerButton({banner, onLeftClick, onRightClick}) {
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
        <button className='BannerButton' onClick={onClick} onContextMenu={onContextMenu}>
            <BannerComponent banner={banner}/>
        </button>
    );
}