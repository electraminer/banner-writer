// Internal dependencies
import renderImage from "./RenderImage";
import Writing from "../../model/Writing";
// External dependencies
import { Canvas } from "canvas";

const BUFFER_LEN = 100;
let BUFFER_INDEX = 0;
const BUFFER = Array(BUFFER_LEN).fill(undefined);

const IMAGE_CACHE = {};

export default async function loadImage(str: string): Promise<Canvas> {
    console.log(`Loading image of ${str}`);
    if (IMAGE_CACHE[str]) {
        console.log(`Found image in cache`);
        return IMAGE_CACHE[str];
    }

    console.log(`Could not find in cache, generating image`);
    let writing = undefined;
    try {
        // First try to use the new URL Safe encoding.
        writing = Writing.fromUrlSafe(str);
    } catch (_) {
        // If not, try the old BannerFont encoding for backwards compatibility.
        [writing] = Writing.fromString(str);
    }
    const canvas = renderImage(writing);

    const unloaded = BUFFER[BUFFER_INDEX];
    if (unloaded) {
        console.log(`Unloading image ${unloaded} from cache`);
        delete IMAGE_CACHE[unloaded];
    }
    BUFFER[BUFFER_INDEX] = str;
    IMAGE_CACHE[str] = canvas;
    BUFFER_INDEX++;
    BUFFER_INDEX %= BUFFER_LEN;

    return canvas;
}