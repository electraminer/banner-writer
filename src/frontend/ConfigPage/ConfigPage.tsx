import SettingsContext from 'frontend/SettingsContext';
import './ConfigPage.css';
// External dependencies
import React from "react";
import Button from 'frontend/Button/Button';
import Text from 'frontend/Text/Text';
import Color from 'model/Color';
import { DEFAULT_KEY_CONFIG } from 'frontend/action/KeyConfig';

export default function ConfigPage({}) {
    const settingsContext = React.useContext(SettingsContext);

    function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
        const config = JSON.parse(e.clipboardData?.getData('text/plain'));
        if (config) {
            settingsContext.setKeyConfig(config);
        }
    }

    return <div className="ConfigPage">
        <p> Toggle the font between banner-style and normal-style: 
            <Button
                onLeftClick={() => settingsContext.setUseBannerFont(
                    !settingsContext.useBannerFont
                )}>
                <Text text={"TOGGLE FONT"} backgroundColor={Color.BROWN} length={15}/>
            </Button>
        </p>
        <p> Enable colorblind mode (adds checkerboard patterns to more easily distinguish colors) 
            <Button
                onLeftClick={() => settingsContext.setColorblindMode(
                    settingsContext.colorblindMode === "sat" ? "rg" :
                    settingsContext.colorblindMode === "rg" ? "rgsat" :
                    settingsContext.colorblindMode === "rgsat" ? "b" :
                    settingsContext.colorblindMode === "b" ? "bsat" :
                    settingsContext.colorblindMode === "bsat" ? undefined :
                    "sat" 
                )}>
                <Text text={
                    settingsContext.colorblindMode === "sat" ? "SATURATED" :
                    settingsContext.colorblindMode === "rg" ? "PROTAN/DEUTAN" :
                    settingsContext.colorblindMode === "rgsat" ? "PRO/DEU SAT" :
                    settingsContext.colorblindMode === "b" ? "TRITAN" :
                    settingsContext.colorblindMode === "bsat" ? "TRITAN SAT" :
                    "DEFAULT"
                } backgroundColor={Color.LIME} length={15}/>
            </Button>
        </p>
        <p>
            Edit your keybinds here. For now, you'll need to edit the .json config file directly.
            For now, feel free to DM Electra to ask about any details about how the JSON config works (I'll add a UI for this later)
        </p>
        <div className="ConfigPage_TextArea">
            <textarea readOnly={true} onPaste={onPaste} value={JSON.stringify(settingsContext.keyConfig)}/>
        </div>
        <Button
            onLeftClick={() => settingsContext.setKeyConfig(DEFAULT_KEY_CONFIG)}>
            <Text text={"RESET TO DEFAULTS"} backgroundColor={Color.BROWN} length={20}/>
        </Button>
        <a href='/'>Back to app</a>
    </div>;
}