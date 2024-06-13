/**
 * One of the 40 minecraft banner Patterns, or the background of a banner.
 */
const enum Pattern {
    BACKGROUND = 0,

    SQUARE_BORDER = 1,
    BRICKS = 2,
    CIRCLE = 3,
    CREEPER_SYMBOL = 4,
    DIAGONAL_CROSS = 5,
    CURLY_BORDER = 6,
    TOP_LEFT_HALF = 7,
    TOP_RIGHT_HALF = 8,
    BOTTOM_LEFT_HALF = 9,
    BOTTOM_RIGHT_HALF = 10,

    FLOWER_SYMBOL = 11,
    GLOBE_SYMBOL = 12,
    TOP_GRADIENT = 13,
    BOTTOM_GRADIENT = 14,
    TOP_HALF = 15,
    BOTTOM_HALF = 16,
    LEFT_HALF = 17,
    RIGHT_HALF = 18,
    MOJANG_SYMBOL = 19,
    PIGLIN_SYMBOL = 20,

    DIAMOND = 21,
    SKULL_SYMBOL = 22,
    STRIPES = 23,
    BOTTOM_LEFT_CORNER = 24,
    BOTTOM_RIGHT_CORNER = 25,
    TOP_LEFT_CORNER = 26,
    TOP_RIGHT_CORNER = 27,
    ORTHOGONAL_CROSS = 28,
    BOTTOM_STRIPE = 29,
    VERTICAL_STRIPE = 30,

    FORWARD_SLASH = 31,
    BACKWARD_SLASH = 32,
    LEFT_STRIPE = 33,
    HORIZONTAL_STRIPE = 34,
    RIGHT_STRIPE = 35,
    TOP_STRIPE = 36,
    BOTTOM_TRIANGLE = 37,
    TOP_TRIANGLE = 38,
    BOTTOM_ZIGZAG = 39,
    TOP_ZIGZAG = 40,
    
    FLOW_SYMBOL = 41,
    GUSTER_SYMBOL = 42,
}
export default Pattern;
export const NUM_PATTERNS = 43;

const PATTERN_CODES = `b
    bo|bri|mc|cre|cr|cbo|ld|rud|lud|rd
    flo|glb|gra|gru|hh|hhb|vh|vhr|moj|pig
    mr|sku|ss|bl|br|tl|tr|sc|bs|cs
    dls|drs|ls|ms|rs|ts|bt|tt|bts|tts
    flow|guster
`.trim().split(/\||\n/).map(s=>s.trim());
export function toPatternCode(pattern: Pattern): string {
    return PATTERN_CODES[pattern];
}

const REVERSE_PATTERN_CODES = {};
for (let pattern = 0; pattern < NUM_PATTERNS; pattern++) {
    const value = PATTERN_CODES[pattern as Pattern];
    REVERSE_PATTERN_CODES[value] = pattern as Pattern;
}
export function fromPatternCode(code: string): Pattern {
    let pattern = REVERSE_PATTERN_CODES[code];
    if (pattern == undefined) {
        throw new Error(`${code} is not a valid Pattern code.`);
    }
    return pattern;
}