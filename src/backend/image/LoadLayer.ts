// Internal dependencies
import Layer from "../../model/Layer";
// External dependencies
import { loadImage, createCanvas, Canvas } from "canvas";
import applyColorblindMode from "./ColorblindMode";

const LAYER_CACHE = {};

export default async function loadLayer(layer: Layer | string, colorblindMode?: string): Promise<Canvas> {
    console.log(`Loading image of layer ${layer}`);
    let basePath = `/textures/${layer}.png`;
    let path = `/textures/${colorblindMode}/${layer}.png`;
    if (typeof layer === "object") {
        basePath = layer.staticImagePath();
        path = layer.staticImagePath(colorblindMode);
    }

    if (LAYER_CACHE[path]) {
        console.log(`Found layer image in cache`);
        return LAYER_CACHE[path];
    }
    console.log(`Could not find in cache, loading ${path} from filesystem`);
    const image = await loadImage(`https://banner-writer.web.app${basePath}`);

    // Convert image to a canvas
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    applyColorblindMode(canvas, colorblindMode)

    console.log(`Loaded image`);
    LAYER_CACHE[path] = canvas;
    return canvas;
}