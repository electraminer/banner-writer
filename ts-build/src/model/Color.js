"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contrastingColor = exports.fromColorCode = exports.toColorCode = exports.NUM_COLORS = void 0;
exports.NUM_COLORS = 16;
var COLOR_CODES = [
    0, 8, 7, 15, 4, 1, 14, 12,
    5, 13, 3, 9, 11, 6, 2, 10,
];
function toColorCode(color) {
    return COLOR_CODES[color];
}
exports.toColorCode = toColorCode;
var REVERSE_COLOR_CODES = {};
for (var color = 0; color < exports.NUM_COLORS; color++) {
    var value = COLOR_CODES[color];
    REVERSE_COLOR_CODES[value] = color;
}
function fromColorCode(code) {
    var color = REVERSE_COLOR_CODES[code];
    if (color == undefined) {
        throw new Error("".concat(code, " is not a valid Color code."));
    }
    return color;
}
exports.fromColorCode = fromColorCode;
var LIGHT_COLORS = [0 /* Color.WHITE */, 1 /* Color.LIGHT_GRAY */, 4 /* Color.YELLOW */, 5 /* Color.ORANGE */,
    8 /* Color.LIME */, 10 /* Color.LIGHT_BLUE */, 11 /* Color.CYAN */, 13 /* Color.PINK */, 14 /* Color.MAGENTA */];
function contrastingColor(color, dark, light) {
    light !== null && light !== void 0 ? light : (light = 1 /* Color.LIGHT_GRAY */);
    dark !== null && dark !== void 0 ? dark : (dark = 2 /* Color.GRAY */);
    return LIGHT_COLORS.includes(color) ? dark : light;
}
exports.contrastingColor = contrastingColor;