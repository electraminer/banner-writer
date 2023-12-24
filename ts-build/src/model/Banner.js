"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var Layer_1 = __importDefault(require("./Layer"));
// External dependencies
var immer_1 = require("immer");
/**
 * A Banner consisting of a background and a stack of Layers.
 */
var Banner = /** @class */ (function () {
    /** Creates a new Banner with a background Color and any amount of Layers. */
    function Banner(background) {
        var layers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            layers[_i - 1] = arguments[_i];
        }
        this[_a] = true;
        this.background = background;
        this.layers = layers;
    }
    /** Gets the Layer representing the Banner's background. */
    Banner.prototype.backgroundLayer = function () {
        return new Layer_1.default(this.background, 0);
    };
    /** Gets a list of Layers in the banner including the background. */
    Banner.prototype.layersWithBackground = function () {
        return [this.backgroundLayer()].concat(this.layers);
    };
    /** Returns the URL path to an image of this Banner. */
    Banner.prototype.imagePath = function () {
        return "/".concat(this.toString(), ".png");
    };
    /** Returns the /getbannercode code which encodes this Banner. */
    Banner.prototype.toCode = function () {
        var code = "";
        for (var _i = 0, _b = this.layersWithBackground(); _i < _b.length; _i++) {
            var layer = _b[_i];
            code += layer.toCode();
        }
        return code;
    };
    /**
     * Creates a Banner from a /getbannercode code, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    Banner.fromCode = function (code, index) {
        index !== null && index !== void 0 ? index : (index = 0);
        var _b = Layer_1.default.fromCode(code, index), backgroundLayer = _b[0], newIndex = _b[1];
        if (backgroundLayer.pattern != 0 /* Pattern.BACKGROUND */) {
            throw new Error("Banner did not begin with a background Layer.");
        }
        var banner = new Banner(backgroundLayer.color);
        index = newIndex;
        while (code.charCodeAt(index) >= 0x61 && code.charCodeAt(index) <= 0x7A) {
            var _c = Layer_1.default.fromCode(code, index), layer = _c[0], newIndex_1 = _c[1];
            banner.layers.push(layer);
            index = newIndex_1;
        }
        return [banner, index];
    };
    /** Returns the BannerFont string which encodes this Banner. */
    Banner.prototype.toString = function () {
        var str = "";
        str += this.backgroundLayer().toString();
        for (var _i = 0, _b = this.layers; _i < _b.length; _i++) {
            var layer = _b[_i];
            str += String.fromCodePoint(0xCFFF7);
            str += layer.toString();
        }
        return str;
    };
    /**
     * Creates a Banner from a BannerFont string, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    Banner.fromString = function (str, index) {
        index !== null && index !== void 0 ? index : (index = 0);
        var _b = Layer_1.default.fromString(str, index), backgroundLayer = _b[0], newIndex = _b[1];
        if (backgroundLayer.pattern != 0 /* Pattern.BACKGROUND */) {
            throw new Error("Banner did not begin with a background Layer.");
        }
        var banner = new Banner(backgroundLayer.color);
        index = newIndex;
        while (str.codePointAt(index) == 0xCFFF7) {
            index += 2;
            var _c = Layer_1.default.fromString(str, index), layer = _c[0], newIndex_2 = _c[1];
            banner.layers.push(layer);
            index = newIndex_2;
        }
        return [banner, index];
    };
    return Banner;
}());
_a = immer_1.immerable;
exports.default = Banner;
