// Internal dependencies
import Banner from 'model/Banner';
import Color from 'model/Color';
// External dependencies
import React from 'react';
import { produce } from 'immer';

const BannerContext = React.createContext(null);
export default BannerContext;

export function BannerContextProvider(props: {children: React.ReactNode}) {
    const [banner, setBanner] = React.useState(new Banner(Color.WHITE));

    const updateBanner = function(update: (banner: Banner) => void) {
        setBanner(produce(banner, (banner: Banner) => {
            update(banner);
        }));
    }

    return (
        <BannerContext.Provider value={{
            banner: banner,
            setBanner: setBanner,
            updateBanner: updateBanner,
        }}>
            {props.children}
        </BannerContext.Provider>
    )
}
