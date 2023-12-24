import Writing from "./Writing";
// Internal dependencies
import Banner from "./Banner";

const BANNER_A = Banner.fromString("󏿷󏿷󏿷󏿷󏿷")[0];
const BANNER_B = Banner.fromString("󏿷󏿷󏿷󏿷󏿷󏿷")[0];
const BANNER_C = Banner.fromString("󏿷󏿷󏿷󏿷")[0];

const ONE_LINE = new Writing(
    false,
    [BANNER_A, BANNER_B, BANNER_C],
)

const MULTI_LINE = new Writing(
    false,
    [BANNER_A, undefined, BANNER_B, BANNER_C],
    [BANNER_A, BANNER_B, undefined, BANNER_C],
)

const RIGHT_TO_LEFT = new Writing(
    true,
    [BANNER_C, BANNER_B, undefined, BANNER_A],
    [BANNER_C, undefined, BANNER_B, BANNER_A],
)

test("Test fetching URL path to Writing textures.", () => {
    expect(ONE_LINE.imagePath())
        .toBe("/󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷.png");
            // E00E [BANNER_A] [BANNER_B] [BANNER_C] E00A
    expect(MULTI_LINE.imagePath())
        .toBe("/󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷.png");
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
    expect(RIGHT_TO_LEFT.imagePath())
        .toBe("/󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷.png");
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
});

test("Test BannerFont encoding of Writings.", () => {
    expect(ONE_LINE.toString())
        .toBe("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷");
            // E00E [BANNER_A] [BANNER_B] [BANNER_C] E00A
    expect(MULTI_LINE.toString())
        .toBe("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷");
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
    expect(RIGHT_TO_LEFT.toString())
        .toBe("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷");
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
});

test("Test BannerFont decoding of Writings works on canonical representation.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] [BANNER_B] [BANNER_C] E00A
        .toStrictEqual([ONE_LINE, 50]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
        .toStrictEqual([MULTI_LINE, 101]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
        .toStrictEqual([RIGHT_TO_LEFT, 101]);
});

test("Test BannerFont decoding of Writings works on CRLF line endings.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\r\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] 0D 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
        .toStrictEqual([MULTI_LINE, 102]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\r\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] 0D 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
        .toStrictEqual([RIGHT_TO_LEFT, 102]);
});

test("Test BannerFont decoding of Writings works on EOF.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] [BANNER_B] [BANNER_C]
        .toStrictEqual([ONE_LINE, 49]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C]
        .toStrictEqual([MULTI_LINE, 100]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C]
        .toStrictEqual([RIGHT_TO_LEFT, 100]);
});

test("Test BannerFont decoding of Writings works with no direction marker.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"))
            // [BANNER_A] [BANNER_B] [BANNER_C] E00A
        .toStrictEqual([ONE_LINE, 49]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
        .toStrictEqual([MULTI_LINE, 100]);
});

test("Test BannerFont decoding of Writings works with set starting point.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷", 16))
            // [BANNER_A] E00E [BANNER_A] [BANNER_B] [BANNER_C] E00A
        .toStrictEqual([ONE_LINE, 66]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷", 16))
            // [BANNER_A] E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A [BANNER_A]
        .toStrictEqual([MULTI_LINE, 117]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷", 16))
            // [BANNER_A] E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A [BANNER_A]
        .toStrictEqual([RIGHT_TO_LEFT, 117]);
});

test("Test BannerFont decoding of Writings fails with /r and no /n.", () => {
    expect(() => Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\r󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] 0D [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
        .toThrow(Error);
    expect(() => Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\r󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] 0D [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
        .toThrow(Error);
})

test("Test BannerFont decoding of Writings fails with non-BannerFont characters.", () => {
    expect(() => Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷abc󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] abc [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
        .toThrow(Error);
    expect(() => Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷abc󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] abc [BANNER_A] [BANNER_B] 20 [BANNER_C] E00A
        .toThrow(Error);
})

test("Test optimized BannerFont encoding of writing works.", () => {
    expect(ONE_LINE.toOptimizedString())
        .toBe("󏿥󏿥󏿥󏿥󏿥󏿷");
    expect(MULTI_LINE.toOptimizedString())
        .toBe("󏿷󏿷󏿷󏿷󏿷 󏿮󏿮󏿮󏿮󏿮󏿷\n󏿮󏿮󏿮󏿮󏿮󏿷 󏿷󏿷󏿷󏿷");
    expect(RIGHT_TO_LEFT.toOptimizedString())
        .toBe("󏿷󏿷󏿷󏿷󏿷 󏿮󏿮󏿮󏿮󏿮󏿷\n󏿮󏿮󏿮󏿮󏿮󏿷 󏿷󏿷󏿷󏿷");
    
})