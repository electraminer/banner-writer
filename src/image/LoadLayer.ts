// Internal dependencies
import Layer from "../model/Layer";
// External dependencies
import { loadImage, Image } from "canvas";

const LAYER_CACHE = {};

export default async function loadLayer(layer: Layer): Promise<Image> {
    console.log(`Loading image of layer ${layer}`);
    const path = layer.staticImagePath();
    if (LAYER_CACHE[path]) {
        console.log(`Found layer image in cache`);
        return LAYER_CACHE[path];
    }
    console.log(`Could not find in cache, loading from filesystem`);
    const image = await loadImage("./build" + path);
    LAYER_CACHE[path] = image;
    return image;
}