"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromPatternCode = exports.toPatternCode = exports.NUM_PATTERNS = void 0;
exports.NUM_PATTERNS = 41;
var PATTERN_CODES = "b\n    bo|bri|mc|cre|cr|cbo|ld|rud|lud|rd\n    flo|glb|gra|gru|hh|hhb|vh|vhr|moj|pig\n    mr|sku|ss|bl|br|tl|tr|sc|bs|cs\n    dls|drs|ls|ms|rs|ts|bt|tt|bts|tts\n".trim().split(/\||\n/).map(function (s) { return s.trim(); });
function toPatternCode(pattern) {
    return PATTERN_CODES[pattern];
}
exports.toPatternCode = toPatternCode;
var REVERSE_PATTERN_CODES = {};
for (var pattern = 0; pattern < exports.NUM_PATTERNS; pattern++) {
    var value = PATTERN_CODES[pattern];
    REVERSE_PATTERN_CODES[value] = pattern;
}
function fromPatternCode(code) {
    var pattern = REVERSE_PATTERN_CODES[code];
    if (pattern == undefined) {
        throw new Error("".concat(code, " is not a valid Pattern code."));
    }
    return pattern;
}
exports.fromPatternCode = fromPatternCode;
