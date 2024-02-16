import "./BannerEditor.css"
// Internal dependencies
import LayerSelector from "./LayerSelector/LayerSelector";
import LayerStack from "./LayerStack/LayerStack";
import ForceSize from "../../ForceSize/ForceSize";
// External dependencies
import React, { useEffect } from "react";
import BannerDisplay from "./BannerDisplay/BannerDisplay";
import ActionContext from "frontend/action/ActionContext";
import Banner from "model/Banner";
import Color from "model/Color";
import { Action } from "frontend/action/Action";
import { produce } from "immer";
import Layer from "model/Layer";

export default function BannerEditor() {
    const actionContext = React.useContext(ActionContext);

    const [banner, setBanner] = actionContext.useStateProvider(
        React.useRef(), "banner", React.useState(new Banner(Color.WHITE)));
    const offsetProvider = actionContext.useProvider(React.useRef(), "layerOffset");
    const indexProvider = actionContext.useProvider(React.useRef(), "layerIndex");

    const insertLayerHandler = actionContext.useHandler(React.useRef(), Action.INSERT_LAYER);
    const removeLayerHandler = actionContext.useHandler(React.useRef(), Action.REMOVE_LAYER);
    const swapLayerHandler = actionContext.useHandler(React.useRef(), Action.SWAP_LAYER);
    const setLayerColorHandler = actionContext.useHandler(React.useRef(), Action.SET_LAYER_COLOR);
    const setBannerHandler = actionContext.useHandler(React.useRef(), Action.SET_BANNER);
    const clearBannerHandler = actionContext.useHandler(React.useRef(), Action.CLEAR_BANNER);
    const addClearBannerHandler = actionContext.useHandler(React.useRef(), Action.ADD_CLEAR_BANNER);

    useEffect(() => {
        offsetProvider(resolver => 0)
        indexProvider(resolver => resolver("banner").layers.length - resolver("layerOffset"));
        insertLayerHandler(params => {
            const index = params.layerIndex;
            if (index < 0 || index > params.banner.layers.length) {
                return;
            }
            if (params.banner.layers.length >= 6) {
                return;
            }
            const layer = new Layer(params.color, params.pattern);
            setBanner(banner => produce(banner, banner => {
                banner.layers.splice(index, 0, layer)
            }))
        })
        removeLayerHandler((params, invoke) => {
            const index = params.layerIndex - 1;
            if (index == -1) {
                invoke(Action.BACKSPACE_SELECT);
            }
            if (index < 0 || index >= params.banner.layers.length) {
                return;
            }
            setBanner(banner => produce(banner, banner => {
                banner.layers.splice(index, 1)
            }))
        })
        swapLayerHandler(params => {
            const index = params.layerIndex - 1;
            if (index < 1 || index >= params.banner.layers.length) {
                return;
            }
            setBanner(banner => produce(banner, banner => {
                const temp = banner.layers[index - 1];
                banner.layers[index - 1] = banner.layers[index];
                banner.layers[index] = temp;
            }))
        })
        setLayerColorHandler(params => {
            const index = params.layerIndex - 1;
            if (index == -1) {
                setBanner(banner => produce(banner, banner => {
                    banner.background = params.color;
                }))
            }
            if (index < 0 || index >= params.banner.layers.length) {
                return;
            }
            setBanner(banner => produce(banner, banner => {
                banner.layers[index].color = params.color;
            }))
        })
        setBannerHandler(params => {
            setBanner(params.banner);
        })
        clearBannerHandler(params => {
            setBanner(new Banner(params.color));
        })
        addClearBannerHandler(params => {
            setBanner(new Banner(params.color));
        })
    }, []);
    
    return (
        <div className="BannerEditor">
            <ForceSize className="BannerEditorLayerSelector">
                <LayerSelector/>
            </ForceSize>
            <ForceSize className="BannerEditorLayerStack">
                <LayerStack banner={banner}/>
            </ForceSize>
            <ForceSize className="BannerEditorBannerDisplay">
                <BannerDisplay banner={banner}/>
            </ForceSize>
        </div>
    )
}

