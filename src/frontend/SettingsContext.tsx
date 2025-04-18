// External dependencies
import React from 'react';
import KeyConfig, { DEFAULT_KEY_CONFIG } from './action/KeyConfig';

const SettingsContext = React.createContext(null);
export default SettingsContext;

export function SettingsContextProvider(props: {children: React.ReactNode}) {
    const [useBannerFont, setUseBannerFont] = React.useState(
        localStorage.useBannerFont !== "false");
        

    const setUseBannerFontSaved = function(useBannerFont: boolean) {
        setUseBannerFont(useBannerFont);
        localStorage.useBannerFont = useBannerFont;
    } 
    
    const [keyConfig, setKeyConfig] = React.useState<KeyConfig>(() => {
        try {
            return JSON.parse(localStorage.keyConfig);
        } catch (e) {
            return DEFAULT_KEY_CONFIG;
        }
    });

    const setKeyConfigSaved = function(keyConfig: KeyConfig) {
        setKeyConfig(keyConfig);
        localStorage.keyConfig = JSON.stringify(keyConfig);
    } 

    return (
        <SettingsContext.Provider value={{
            useBannerFont: useBannerFont,
            setUseBannerFont: setUseBannerFontSaved,
            keyConfig: keyConfig,
            setKeyConfig: setKeyConfigSaved,
        }}>
            {props.children}
        </SettingsContext.Provider>
    )
}
