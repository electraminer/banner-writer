/**
 * One of the 16 minecraft Colors.
 */
const enum Color {
    WHITE = 0,
    LIGHT_GRAY = 1,
    GRAY = 2,
    BLACK = 3,
    YELLOW = 4,
    ORANGE = 5,
    RED = 6,
    BROWN = 7,
    LIME = 8,
    GREEN = 9,
    LIGHT_BLUE = 10,
    CYAN = 11,
    BLUE = 12,
    PINK = 13,
    MAGENTA = 14,
    PURPLE = 15,
}

export default Color;
export const NUM_COLORS = 16;

const COLOR_CODES = [
    0, 8, 7, 15, 4, 1, 14, 12,
    5, 13, 3, 9, 11, 6, 2, 10,
];
export function toColorCode(color: Color): number {
    return COLOR_CODES[color];
}

const REVERSE_COLOR_CODES = {};
for (let color = 0; color < NUM_COLORS; color++) {
    const value = COLOR_CODES[color as Color];
    REVERSE_COLOR_CODES[value] = color as Color;
}
export function fromColorCode(code: number): Color {
    let color = REVERSE_COLOR_CODES[code];
    if (color == undefined) {
        throw new Error(`${code} is not a valid Color code.`);
    }
    return color;
}

const LIGHT_COLORS = [Color.WHITE, Color.LIGHT_GRAY, Color.YELLOW, Color.ORANGE,
    Color.LIME, Color.LIGHT_BLUE, Color.CYAN, Color.PINK, Color.MAGENTA];
export function contrastingColor(color: Color, dark?: Color, light?: Color): Color {
    light ??= Color.LIGHT_GRAY;
    dark ??= Color.GRAY;
    return LIGHT_COLORS.includes(color) ? dark : light;
}
const COLOR_NAMES = `
    white|light_gray|gray|black|yellow|orange|red|brown
    lime|green|light_blue|cyan|blue|pink|magenta|purple
`.trim().split(/\||\n/).map(s=>s.trim());
export function toColorName(color: Color): string {
    return COLOR_NAMES[color];
}