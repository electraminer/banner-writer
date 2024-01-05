// Internal dependencies
import Color, { NUM_COLORS, toColorCode, fromColorCode } from "./Color";
import Pattern, { NUM_PATTERNS, toPatternCode, fromPatternCode } from "./Pattern";
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

    /** Returns the URL path to a statically served image of this Layer. */
    staticImagePath(): string {
        const hexCode = this.color.toString(16) + this.pattern.toString(10).padStart(2, '0');
        return `/textures/${hexCode}.png`;
    }

    /** Returns the URL path to an image of this Layer. */
    imagePath(): string {
        return `/image/${this.toString()}.png`;
    }

    /** Returns the /getbannercode code which encodes this Layer. */
    toCode(): string {
        const colorCode = toColorCode(this.color);
        const patternCode = toPatternCode(this.pattern);
        return `${patternCode}${colorCode}`;
    }

    /**
     * Creates a Layer from a /getbannercode code, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    static fromCode(code: string, index?: number): [Layer, number] {
        index ??= 0;

        let patternCode = "";
        while (code.charCodeAt(index) >= 0x61 && code.charCodeAt(index) <= 0x7A) {
            patternCode += code.charAt(index);
            index++;
        }

        let colorCode = "";
        while (code.charCodeAt(index) >= 0x30 && code.charCodeAt(index) <= 0x39) {
            colorCode += code.charAt(index);
            index++;
        }

        const color = fromColorCode(parseInt(colorCode));
        const pattern = fromPatternCode(patternCode);
        const layer = new Layer(color, pattern);
        return [layer, index];
    }

    /** Returns the BannerFont string which encodes this Layer. */
    toString(): string {
        const hexCode = this.color.toString(16) + this.pattern.toString(10).padStart(2, '0');
        const codePoint = 0xE000 + parseInt(hexCode, 16)
        return String.fromCodePoint(codePoint);
    }

    /**
     * Creates a Layer from a BannerFont string, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    static fromString(str: string, index?: number): [Layer, number] {
        index ??= 0;

        const codePoint = str.codePointAt(index);
        if (codePoint == undefined) {
            throw new Error("Reached the end of a string while attempting to parse a Layer");
        }

        if (codePoint < 0xE000 || codePoint >= 0xF000 ) {
            throw new Error(`Code point ${codePoint} is not a BannerFont character.`);
        }

        const color = (codePoint & 0xF00) / 0x100;
        if (color >= NUM_COLORS) {
            throw new Error(`Color represented by number '${color}' is not a valid Color.`);
        }

        const patternHigh = (codePoint & 0xF0) / 0x10;
        const patternLow = (codePoint & 0xF);
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