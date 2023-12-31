"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODEPOINT_WRITING_DIR_RTL = exports.CODEPOINT_WRITING_DIR_LTR = exports.CODEPOINT_WRITING_END = void 0;
// Internal dependencies
var Banner_1 = __importDefault(require("./Banner"));
// External dependencies
var immer_1 = require("immer");
exports.CODEPOINT_WRITING_END = 0xE00A;
exports.CODEPOINT_WRITING_DIR_LTR = 0xE00E;
exports.CODEPOINT_WRITING_DIR_RTL = 0xE00F;
/**
 * A block of Writing consisting of many lines of Banners with spaces.
 */
var Writing = /** @class */ (function () {
    /** Creates a new Writing with a direction and any amount of lines. */
    function Writing(rightToLeft) {
        var lines = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            lines[_i - 1] = arguments[_i];
        }
        this[_a] = true;
        this.rightToLeft = rightToLeft;
        this.lines = lines !== null && lines !== void 0 ? lines : [];
    }
    /** Returns the URL path to an image of this Writing. */
    Writing.prototype.imagePath = function () {
        return "/".concat(this.toString(), ".png");
    };
    /** Returns the BannerFont string which encodes this Writing. */
    Writing.prototype.toString = function () {
        var str = String.fromCodePoint(this.rightToLeft ? exports.CODEPOINT_WRITING_DIR_RTL : exports.CODEPOINT_WRITING_DIR_LTR);
        for (var i = 0; i < this.lines.length; i++) {
            if (i != 0) {
                str += "\n";
            }
            var line = this.lines[i];
            for (var _i = 0, _b = this.rightToLeft ? line.slice().reverse() : line; _i < _b.length; _i++) {
                var banner = _b[_i];
                str += banner ? banner.toString() : " ";
            }
        }
        return str + String.fromCodePoint(exports.CODEPOINT_WRITING_END);
    };
    /**
     * Creates a Writing from a BannerFont string, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    Writing.fromString = function (str, index) {
        index !== null && index !== void 0 ? index : (index = 0);
        var rightToLeft = false; // default false with legacy writing
        var codePoint = str.codePointAt(index);
        if (codePoint == exports.CODEPOINT_WRITING_DIR_LTR) {
            rightToLeft = false;
            index++;
        }
        else if (codePoint == exports.CODEPOINT_WRITING_DIR_RTL) {
            rightToLeft = true;
            index++;
        }
        var lines = [];
        var line = [];
        while (true) {
            var codePoint_1 = str.codePointAt(index);
            // End of writing / file
            if (codePoint_1 == undefined) {
                break;
            }
            if (codePoint_1 == exports.CODEPOINT_WRITING_END) {
                index++;
                break;
            }
            // Newline
            if (codePoint_1 == 0x0A) {
                index++;
                lines.push(line);
                line = [];
                continue;
            }
            if (codePoint_1 == 0x0D) {
                index++;
                var nextCodePoint = str.codePointAt(index);
                if (nextCodePoint != 0x0A) {
                    throw new Error("Carriage return was not followed by a line feed");
                }
                index++;
                lines.push(line);
                line = [];
                continue;
            }
            // Space
            if (codePoint_1 == 0x20) {
                index++;
                line.push(undefined);
                continue;
            }
            // Banner
            var _b = Banner_1.default.fromString(str, index), banner = _b[0], newIndex = _b[1];
            line.push(banner);
            index = newIndex;
        }
        lines.push(line);
        if (rightToLeft) {
            for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                var line_1 = lines_1[_i];
                line_1.reverse();
            }
        }
        var writing = new (Writing.bind.apply(Writing, __spreadArray([void 0, rightToLeft], lines, false)))();
        return [writing, index];
    };
    /** Creates an arbitrary space character jumping the specified number of banners. */
    Writing._generateSpace = function (size) {
        return String.fromCodePoint(0xD0000 + size * 9);
    };
    /** Optimizes a single group of banners using arbitrary-space characters. */
    Writing._optimizeBanners = function (banners) {
        var str = "";
        // The maximum layer count of all banners in the list.
        var maxLayer = 0;
        // The number of "skips" (extra background layers) to add to each banner.
        var skipCounts = [];
        for (var _i = 0, banners_1 = banners; _i < banners_1.length; _i++) {
            var banner = banners_1[_i];
            // Begin by adding all background layers
            str += banner.backgroundLayer().toString();
            maxLayer = Math.max(maxLayer, banner.layers.length);
            skipCounts.push(0);
        }
        // The current position of the cursor while typing
        var position = banners.length;
        // Iterate through each banner in each layer
        for (var layer = 0; layer <= maxLayer; layer++) {
            for (var i = 0; i < banners.length; i++) {
                var banner = banners[i];
                if (layer < banner.layers.length) {
                    // If you would need to skip exactly one banner, add a skip.
                    // This is because adding 1 layer is 1 char less than a space.
                    if (position == i - 1) {
                        skipCounts[position] += 1;
                    }
                    position = i + 1;
                }
            }
        }
        // Reset the position now that skip counts have been calculated
        position = banners.length;
        for (var layer = 0; layer <= maxLayer; layer++) {
            for (var i = 0; i < banners.length; i++) {
                var banner = banners[i];
                // If the banner needs to be written
                if (layer - skipCounts[i] < banner.layers.length) {
                    // Move to the correct position if needed
                    if (position != i) {
                        str += Writing._generateSpace(i - position);
                    }
                    // Add a "skip" or the next layer of the banner
                    if (layer - skipCounts[i] < 0) {
                        str += banner.backgroundLayer().toString();
                    }
                    else {
                        str += banner.layers[layer - skipCounts[i]].toString();
                    }
                    position = i + 1;
                }
            }
        }
        return str;
    };
    /**
     * Returns a BannerFont string that represents this Writing.
     * This string will be optimized to minimize the number of characters used.
     * The optimization uses arbitrary-sized space characters and is only
     * guaranteed to work inside Minecraft using the BannerFont resource pack.
     * The optimization will also not be able to be decoded using fromString().
     * Groups of banners between spaces and newlines will be optimized separately.
     */
    Writing.prototype.toOptimizedString = function () {
        var _this = this;
        return this.lines.map(function (line) {
            if (_this.rightToLeft) {
                line = line.slice().reverse();
            }
            // split line by spaces
            var groups = [[]];
            for (var _i = 0, line_2 = line; _i < line_2.length; _i++) {
                var banner = line_2[_i];
                if (banner == undefined) {
                    groups.push([]);
                }
                else {
                    groups.at(-1).push(banner);
                }
            }
            // optimize groups one at a time
            return groups.map(function (group) { return Writing._optimizeBanners(group); })
                .join(" ");
        }).join("\n");
    };
    return Writing;
}());
exports.default = Writing;
_a = immer_1.immerable;
