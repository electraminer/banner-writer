import "./BannerEditor.css"
// Internal dependencies
import LayerSelector from "./LayerSelector/LayerSelector";
import LayerStack from "./LayerStack/LayerStack";
import { ColorContextProvider } from "./ColorContext";
import ForceSize from "../../ForceSize/ForceSize";
// External dependencies
import React from "react";
import BannerDisplay from "./BannerDisplay/BannerDisplay";

export default function BannerEditor() {
    return (
        <ColorContextProvider>
            <div className="BannerEditor">
                <ForceSize className="BannerEditorLayerSelector">
                    <LayerSelector/>
                </ForceSize>
                <ForceSize className="BannerEditorLayerStack">
                    <LayerStack/>
                </ForceSize>
                <ForceSize className="BannerEditorBannerDisplay">
                    <BannerDisplay/>
                </ForceSize>
            </div>
        </ColorContextProvider>
    )
}

