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
    JAGGED_BORDER = 6,
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
    BOTTOM_SIDE = 29,
    VERTICAL_LINE = 30,

    FORWARD_SLASH = 31,
    BACKWARD_SLASH = 32,
    LEFT_SIDE = 33,
    HORIZONTAL_LINE = 34,
    RIGHT_SIDE = 35,
    TOP_SIDE = 36,
    BOTTOM_TRIANGLE = 37,
    TOP_TRIANGLE = 38,
    BOTTOM_ZIGZAG = 39,
    TOP_ZIGZAG = 40,

}
export default Pattern;
export const NUM_PATTERNS = 41;