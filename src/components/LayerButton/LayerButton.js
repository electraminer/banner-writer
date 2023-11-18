import Banner from 'model/Banner';

import BannerButton from 'components/BannerButton/BannerButton';

export default function LayerButton({layer, onLeftClick, onRightClick}) {
    const darkBackgroundColors = [0, 1, 4, 5, 8, 10, 11, 13, 14];
    const lightBackground = 1;
    const darkBackground = 2;
    
    let background = lightBackground;
    if (darkBackgroundColors.includes(layer.color)) {
        background = darkBackground;
    }

    const banner = new Banner(background, layer);

    return (
        <BannerButton banner={banner} onLeftClick={onLeftClick} onRightClick={onRightClick}/>
    );
}