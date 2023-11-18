import Banner from 'model/Banner';

import React from 'react';
import {produce} from 'immer';

const BannerContext = React.createContext(null);
export default BannerContext;

export function BannerContextProvider({children}) {
    const [banner, setBanner] = React.useState(new Banner(0));

    const updateBanner = function(update) {
        setBanner(produce(banner, update))
    }

    return (
        <BannerContext.Provider value={{
            banner: banner,
            setBanner: setBanner,
            updateBanner: updateBanner,
        }}>
            {children}
        </BannerContext.Provider>
    )
}
