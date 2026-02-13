// Internal dependencies
import Color from "./Color";
import Pattern from "./Pattern";
import Layer from "./Layer";
import { toColorName } from "./Color";
import { toPatternName } from "./Pattern";
// External dependencies
import {immerable} from "immer";
import Writing from "./Writing";

/**
 * A Banner consisting of a background and a stack of Layers.
 */
class Banner {
    [immerable] = true;

    /** The background Color of the Banner. */
    background: Color;
    /** The non-background Layers of the Banner. */
    layers: Layer[];

    /** Creates a new Banner with a background Color and any amount of Layers. */
    constructor(background: Color, ...layers: Layer[]) {
        this.background = background;
        this.layers = layers;
    }

    /** Gets the Layer representing the Banner's background. */
    backgroundLayer() {
        return new Layer(this.background, 0);
    }

    /** Gets a list of Layers in the banner including the background. */
    layersWithBackground() {
        return [this.backgroundLayer()].concat(this.layers);
    }

    /** Returns the URL path to an image of this Banner. */
    imagePath(colorblindMode?: string): string {
        const writing = new Writing(false, [this]);
        return writing.imagePath(colorblindMode);
    }

    
    /** Returns the /getbannercode code which encodes this Banner. */
    toCode() {
        let code = "";
        for (const layer of this.layersWithBackground()) {
            code += layer.toCode();
        }
        return code;
    }

    /**
     * Creates a Banner from a /getbannercode code, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    static fromCode(code: string, index?: number): [Banner, number] {
        index ??= 0;

        let [backgroundLayer, newIndex] = Layer.fromCode(code, index);
        if (backgroundLayer.pattern != Pattern.BACKGROUND) {
            throw new Error("Banner did not begin with a background Layer.");
        }
        let banner = new Banner(backgroundLayer.color);
        index = newIndex;

        while (code.charCodeAt(index) >= 0x61 && code.charCodeAt(index) <= 0x7A) {
            let [layer, newIndex] = Layer.fromCode(code, index);
            banner.layers.push(layer);
            index = newIndex;
        }

        return [banner, index];
    }

    /** Returns the BannerFont string which encodes this Banner. */
    toString() {
        let str = "";
        str += this.backgroundLayer().toString();
        for (const layer of this.layers) {
            str += String.fromCodePoint(0xCFFF7);
            str += layer.toString();
        }
        return str;
    }

    /**
     * Creates a Banner from a BannerFont string, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    static fromString(str: string, index?: number): [Banner, number] {
        index ??= 0;

        let [backgroundLayer, newIndex] = Layer.fromString(str, index);
        if (backgroundLayer.pattern != Pattern.BACKGROUND) {
            throw new Error("Banner did not begin with a background Layer.");
        }
        let banner = new Banner(backgroundLayer.color);
        index = newIndex;

        while (str.codePointAt(index) == 0xCFFF7 || str.codePointAt(index) == 0xF039) {
            index += str.codePointAt(index) == 0xCFFF7 ? 2 : 1;

            let [layer, newIndex] = Layer.fromString(str, index);
            banner.layers.push(layer);
            index = newIndex;
        }

        return [banner, index];
    }

    /**
     * Returns a Minecraft command that gives the player this Banner.
     */
    toCommandCode() {
        const patterns = this.layers.map(layer => layer.toCommandCode()).join(",");
        return `/give @p ${toColorName(this.background)}_banner[banner_patterns=[${patterns}]]`;
    }
}

export default Banner;