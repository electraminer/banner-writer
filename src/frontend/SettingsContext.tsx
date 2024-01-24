// External dependencies
import React from 'react';

const SettingsContext = React.createContext(null);
export default SettingsContext;

export function SettingsContextProvider(props: {children: React.ReactNode}) {
    const [useBannerFont, setUseBannerFont] = React.useState(
        localStorage.useBannerFont != "false");

    const setUseBannerFontSaved = function(useBannerFont: boolean) {
        setUseBannerFont(useBannerFont);
        localStorage.useBannerFont = useBannerFont;
    } 

    return (
        <SettingsContext.Provider value={{
            useBannerFont: useBannerFont,
            setUseBannerFont: setUseBannerFontSaved,
        }}>
            {props.children}
        </SettingsContext.Provider>
    )
}
