// Internal dependencies
import Color from "./Color";
import Pattern from "./Pattern";
import Layer from "./Layer";
// External dependencies
import {immerable} from "immer";

/**
 * A Banner consisting of a background and a stack of Layers.
 */
class Banner {
    [immerable] = true;

    /** The background Color of the Banner. */
    background: Color;
    /** The non-background Layers of the Banner. */
    layers: Layer[];

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
    imagePath(): string {
        return `/${this.toString()}.png`;
    }

    /** Returns the BannerFont string which encodes the Banner. */
    toString() {
        let string = "";
        string += this.backgroundLayer().toString();
        for (const layer of this.layers) {
            string += String.fromCodePoint(0xCFFF7);
            string += layer.toString();
        }
        return string;
    }

    /**
     * Reads a Banner from a BannerFont string, starting from a given index.
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

        while (str.codePointAt(index) == 0xCFFF7) {
            index += 2;

            let [layer, newIndex] = Layer.fromString(str, index);
            banner.layers.push(layer);
            index = newIndex;
        }

        return [banner, index];
    }
}

export default Banner;