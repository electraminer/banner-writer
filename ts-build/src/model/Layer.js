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
    /** Returns the internal code used to represent the Layer. */
    Layer.prototype._code = function () {
        return this.color.toString(16) + this.pattern.toString(10).padStart(2, '0');
    };
    /** Returns the URL path to a statically served image of this Layer. */
    Layer.prototype.staticImagePath = function () {
        return "/textures/".concat(this._code(), ".png");
    };
    /** Returns the URL path to an image of this Layer. */
    Layer.prototype.imagePath = function () {
        return "/".concat(this.toString(), ".png");
    };
    /** Returns the BannerFont string which encodes the Layer. */
    Layer.prototype.toString = function () {
        var code = 0xE000 + parseInt(this._code(), 16);
        return String.fromCodePoint(code);
    };
    /**
     * Reads a Layer from a BannerFont string, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    Layer.fromString = function (str, index) {
        index !== null && index !== void 0 ? index : (index = 0);
        var code = str.codePointAt(index);
        if (code == undefined) {
            throw new Error("Reached the end of a string while attempting to parse a Layer");
        }
        if (code < 0xE000 || code >= 0xF000) {
            throw new Error("Code point ".concat(code, " is not a BannerFont character."));
        }
        var color = (code & 0xF00) / 0x100;
        if (color >= Color_1.NUM_COLORS) {
            throw new Error("Color represented by number '".concat(color, "' is not a valid Color."));
        }
        var patternHigh = (code & 0xF0) / 0x10;
        var patternLow = (code & 0xF);
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
