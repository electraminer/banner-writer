import "./LayerSelector.css"
// Internal dependencies
import ColorDisplay from "./ColorDisplay/ColorDisplay";
import ColorSelector from "./ColorSelector/ColorSelector";
import PatternSelector from "./PatternSelector/PatternSelector";
// External dependencies
import React from "react";

export default function LayerSelector() {
    return (
        <div className="LayerSelector">
            <div className="LayerSelectorColorRow">
                <ColorDisplay/>
                <ColorSelector/>
            </div>
            <PatternSelector/>
        </div>
    )
}

