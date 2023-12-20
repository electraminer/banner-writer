// Internal dependencies
import Color, { NUM_COLORS } from "./Color";
import Pattern, { NUM_PATTERNS } from "./Pattern";
// External dependencies
import {immerable} from "immer";

/**
 * A single Layer of a Banner.
 * Can be either a background Layer or one of the 6 Pattern Layers.
 * Can be represented by a single BannerFont character.
 * Its image file can be statically served.
 */
class Layer {
    [immerable] = true;

    /** The Color of the Layer. */
    color: Color;
    /** The Pattern of the Layer. */
    pattern: Pattern;

    /** Creates a new Layer with a given color and pattern. */
    constructor(color: Color, pattern: Pattern) {
        this.color = color;
        this.pattern = pattern;
    }

    /** Returns the internal code used to represent the Layer. */
    _code(): string {
        return this.color.toString(16) + this.pattern.toString(10).padStart(2, '0');
    }

    /** Returns the URL path to a statically served image of this Layer. */
    staticImagePath(): string {
        return `/textures/${this._code()}.png`;
    }

    /** Returns the URL path to an image of this Layer. */
    imagePath(): string {
        return `/${this.toString()}.png`;
    }

    /** Returns the BannerFont string which encodes the Layer. */
    toString(): string {
        const code = 0xE000 + parseInt(this._code(), 16)
        return String.fromCodePoint(code);
    }

    /**
     * Reads a Layer from a BannerFont string, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    static fromString(str: string, index?: number): [Layer, number] {
        index ??= 0;

        const code = str.codePointAt(index);
        if (code == undefined) {
            throw new Error("Reached the end of a string while attempting to parse a Layer");
        }

        if (code < 0xE000 || code >= 0xF000 ) {
            throw new Error(`Code point ${code} is not a BannerFont character.`);
        }

        const color = (code & 0xF00) / 0x100;
        if (color >= NUM_COLORS) {
            throw new Error(`Color represented by number '${color}' is not a valid Color.`);
        }

        const patternHigh = (code & 0xF0) / 0x10;
        const patternLow = (code & 0xF);
        if (patternHigh >= 10 || patternLow >= 10) {
            throw new Error(`Pattern is encoded in BCD, not hexadecimal.`);
        }

        const pattern = 10 * patternHigh + patternLow
        if (pattern >= NUM_PATTERNS) {
            throw new Error(`Pattern represented by number '${pattern}' is not a valid Pattern.`);
        }
        
        const layer = new Layer(color, pattern);
        index++;

        return [layer, index]
    }
}

export default Layer;