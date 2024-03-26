// External dependencies
import React from 'react';

const SettingsContext = React.createContext(null);
export default SettingsContext;

export function SettingsContextProvider(props: {children: React.ReactNode}) {
    const [useBannerFont, setUseBannerFont] = React.useState(
        localStorage.useBannerFont !== "false");
    const [disableAliasing, setDisableAliasing] = React.useState(
        localStorage.disableAliasing !== "false");

    const setUseBannerFontSaved = function(useBannerFont: boolean) {
        setUseBannerFont(useBannerFont);
        localStorage.useBannerFont = useBannerFont;
    } 
    
    const setDisableAliasingSaved = function(useBannerFont: boolean) {
        setDisableAliasing(useBannerFont);
        localStorage.disableAliasing = disableAliasing;
    }

    return (
        <SettingsContext.Provider value={{
            useBannerFont: useBannerFont,
            disableAliasing: disableAliasing,
            setUseBannerFont: setUseBannerFontSaved,
            setDisableAliasing: setDisableAliasingSaved,
        }}>
            {props.children}
        </SettingsContext.Provider>
    )
}
