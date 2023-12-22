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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODEPOINT_WRITING_DIR_RTL = exports.CODEPOINT_WRITING_DIR_LTR = exports.CODEPOINT_WRITING_END = void 0;
// Internal dependencies
var Banner_1 = require("./Banner");
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
    return Writing;
}());
exports.default = Writing;
_a = immer_1.immerable;
