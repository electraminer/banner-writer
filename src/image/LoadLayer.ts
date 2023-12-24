// Internal dependencies
import Layer from "../model/Layer";
// External dependencies
import { loadImage, Image } from "canvas";

const LAYER_CACHE = {};

export default async function loadLayer(layer: Layer): Promise<Image> {
    const path = layer.staticImagePath();
    if (LAYER_CACHE[path]) {
        return LAYER_CACHE[path];
    }
    const image = await loadImage("./build" + path);
    LAYER_CACHE[path] = image;
    return image;
}