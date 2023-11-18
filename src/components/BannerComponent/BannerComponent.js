import './BannerComponent.css';

export default function BannerComponent({banner}) {
    return (
        <div className='BannerComponent'>
            <img className='BannerComponentBackground' src={banner.backgroundLayer().texture()}/>
            {banner.layers.map((layer, i) =>
                <img key={i} className='BannerComponentLayer' src={layer.texture()}/>
            )}
            </div>
    )
}