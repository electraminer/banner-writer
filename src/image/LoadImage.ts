// Internal dependencies
import renderImage from "./RenderImage";
import Writing from "../model/Writing";
// External dependencies
import { Canvas } from "canvas";

const BUFFER_LEN = 100;
let BUFFER_INDEX = 0;
const BUFFER = Array(BUFFER_LEN).fill(undefined);

const IMAGE_CACHE = {};

export default async function loadImage(bannerfont: string): Promise<Canvas> {
    console.log(`Loading image of ${bannerfont}`);
    if (IMAGE_CACHE[bannerfont]) {
        console.log(`Found image in cache`);
        return IMAGE_CACHE[bannerfont];
    }

    console.log(`Could not find in cache, generating image`);
    const [writing] = Writing.fromString(bannerfont);
    const canvas = renderImage(writing);

    const unloaded = BUFFER[BUFFER_INDEX];
    if (unloaded) {
        console.log(`Unloading image ${unloaded} from cache`);
        delete IMAGE_CACHE[unloaded];
    }
    BUFFER[BUFFER_INDEX] = bannerfont;
    IMAGE_CACHE[bannerfont] = canvas;
    BUFFER_INDEX++;
    BUFFER_INDEX %= BUFFER_LEN;

    return canvas;
}