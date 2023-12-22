"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Internal dependencies
var Color_1 = require("./Color");
var Pattern_1 = require("./Pattern");
// External dependencies
var immer_1 = require("immer");
/**
 * A single Layer of a Banner.
 * Can be either a background Layer or one of the 6 Pattern Layers.
 * Can be represented by a single BannerFont character.
 * Its image file can be statically served.
 */
var Layer = /** @class */ (function () {
    /** Creates a new Layer with a given color and pattern. */
    function Layer(color, pattern) {
        this[_a] = true;
        this.color = color;
        this.pattern = pattern;
    }
    /** Returns the URL path to a statically served image of this Layer. */
    Layer.prototype.staticImagePath = function () {
        var hexCode = this.color.toString(16) + this.pattern.toString(10).padStart(2, '0');
        return "/textures/".concat(hexCode, ".png");
    };
    /** Returns the URL path to an image of this Layer. */
    Layer.prototype.imagePath = function () {
        return "/".concat(this.toString(), ".png");
    };
    /** Returns the /getbannercode code which encodes this Layer. */
    Layer.prototype.toCode = function () {
        var colorCode = (0, Color_1.toColorCode)(this.color);
        var patternCode = (0, Pattern_1.toPatternCode)(this.pattern);
        return "".concat(patternCode).concat(colorCode);
    };
    /**
     * Creates a Layer from a /getbannercode code, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    Layer.fromCode = function (code, index) {
        index !== null && index !== void 0 ? index : (index = 0);
        var patternCode = "";
        while (code.charCodeAt(index) >= 0x61 && code.charCodeAt(index) <= 0x7A) {
            patternCode += code.charAt(index);
            index++;
        }
        var colorCode = "";
        while (code.charCodeAt(index) >= 0x30 && code.charCodeAt(index) <= 0x39) {
            colorCode += code.charAt(index);
            index++;
        }
        var color = (0, Color_1.fromColorCode)(parseInt(colorCode));
        var pattern = (0, Pattern_1.fromPatternCode)(patternCode);
        var layer = new Layer(color, pattern);
        return [layer, index];
    };
    /** Returns the BannerFont string which encodes this Layer. */
    Layer.prototype.toString = function () {
        var hexCode = this.color.toString(16) + this.pattern.toString(10).padStart(2, '0');
        var codePoint = 0xE000 + parseInt(hexCode, 16);
        return String.fromCodePoint(codePoint);
    };
    /**
     * Creates a Layer from a BannerFont string, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    Layer.fromString = function (str, index) {
        index !== null && index !== void 0 ? index : (index = 0);
        var codePoint = str.codePointAt(index);
        if (codePoint == undefined) {
            throw new Error("Reached the end of a string while attempting to parse a Layer");
        }
        if (codePoint < 0xE000 || codePoint >= 0xF000) {
            throw new Error("Code point ".concat(codePoint, " is not a BannerFont character."));
        }
        var color = (codePoint & 0xF00) / 0x100;
        if (color >= Color_1.NUM_COLORS) {
            throw new Error("Color represented by number '".concat(color, "' is not a valid Color."));
        }
        var patternHigh = (codePoint & 0xF0) / 0x10;
        var patternLow = (codePoint & 0xF);
        if (patternHigh >= 10 || patternLow >= 10) {
            throw new Error("Pattern is encoded in BCD, not hexadecimal.");
        }
        var pattern = 10 * patternHigh + patternLow;
        if (pattern >= Pattern_1.NUM_PATTERNS) {
            throw new Error("Pattern represented by number '".concat(pattern, "' is not a valid Pattern."));
        }
        var layer = new Layer(color, pattern);
        index++;
        return [layer, index];
    };
    return Layer;
}());
_a = immer_1.immerable;
exports.default = Layer;
