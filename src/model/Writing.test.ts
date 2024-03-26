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
        .toBe("/image/R2.0monp2G.0monpi2G.0mpi2G.png");
            // E00E [BANNER_A] [BANNER_B] [BANNER_C] E00D
    expect(MULTI_LINE.imagePath())
        .toBe("/image/R2.0monp2G_.0monpi2G.0mpi2G~.0monp2G.0monpi2G_.0mpi2G.png");
            // E00E [BANNER_A] 5F [BANNER_B] [BANNER_C] E00A 5F [BANNER_A] [BANNER_B] 5F [BANNER_C] E00D
    expect(RIGHT_TO_LEFT.imagePath())
        .toBe("/image/L2.0monp2G_.0monpi2G.0mpi2G~.0monp2G.0monpi2G_.0mpi2G.png");
            // E00F [BANNER_A] 5F [BANNER_B] [BANNER_C] E00A 5F [BANNER_A] [BANNER_B] 5F [BANNER_C] E00D
});

test("Test BannerFont encoding of Writings.", () => {
    expect(ONE_LINE.toString())
        .toBe("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷");
            // E00E [BANNER_A] [BANNER_B] [BANNER_C] E00D
    expect(MULTI_LINE.toString())
        .toBe("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷");
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
    expect(RIGHT_TO_LEFT.toString())
        .toBe("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷");
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
});

test("Test BannerFont decoding of Writings works on canonical representation.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] [BANNER_B] [BANNER_C] E00D
        .toStrictEqual([ONE_LINE, 50]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
        .toStrictEqual([MULTI_LINE, 102]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
        .toStrictEqual([RIGHT_TO_LEFT, 102]);
});

test("Test BannerFont decoding of Writings works on CRLF line endings.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\r\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0D 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
        .toStrictEqual([MULTI_LINE, 103]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\r\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0D 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
        .toStrictEqual([RIGHT_TO_LEFT, 103]);
});

test("Test BannerFont decoding of Writings works on EOF.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] [BANNER_B] [BANNER_C]
        .toStrictEqual([ONE_LINE, 49]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0A [BANNER_A] [BANNER_B] 20 [BANNER_C]
        .toStrictEqual([MULTI_LINE, 101]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0A [BANNER_A] [BANNER_B] 20 [BANNER_C]
        .toStrictEqual([RIGHT_TO_LEFT, 101]);
});

test("Test BannerFont decoding of Writings works with no direction marker.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"))
            // [BANNER_A] [BANNER_B] [BANNER_C] E00D
        .toStrictEqual([ONE_LINE, 49]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
        .toStrictEqual([MULTI_LINE, 101]);
});

test("Test BannerFont decoding of Writings works with different starting and ending point.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷", 16))
            // [BANNER_A] E00E [BANNER_A] [BANNER_B] [BANNER_C] E00D 
        .toStrictEqual([ONE_LINE, 66]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷", 16))
            // [BANNER_A] E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D [BANNER_A]
        .toStrictEqual([MULTI_LINE, 118]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷\n󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷", 16))
            // [BANNER_A] E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 0A [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D [BANNER_A]
        .toStrictEqual([RIGHT_TO_LEFT, 118]);
});

test("Test BannerFont decoding of Writings works with space instead of /n.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 20 [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
        .toStrictEqual([MULTI_LINE, 102]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] E00A 20 [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
        .toStrictEqual([RIGHT_TO_LEFT, 102]);
})

test("Test BannerFont decoding of Writings works with underscores.", () => {
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷_󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷_󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷_󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 5F [BANNER_B] [BANNER_C] E00A 5F [BANNER_A] [BANNER_B] 5F [BANNER_C] E00D
        .toStrictEqual([MULTI_LINE, 102]);
    expect(Writing.fromString("󏿷󏿷󏿷󏿷󏿷_󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷_󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷_󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 5F [BANNER_B] [BANNER_C] E00A 5F [BANNER_A] [BANNER_B] 5F [BANNER_C] E00D
        .toStrictEqual([RIGHT_TO_LEFT, 102]);
})

test("Test BannerFont decoding of Writings fails with non-BannerFont characters.", () => {
    expect(() => Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷abc󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00E [BANNER_A] 20 [BANNER_B] [BANNER_C] abc [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
        .toThrow(Error);
    expect(() => Writing.fromString("󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷abc󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷"))
            // E00F [BANNER_A] 20 [BANNER_B] [BANNER_C] abc [BANNER_A] [BANNER_B] 20 [BANNER_C] E00D
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

test("Test URL encoding of writing works.", () => {
    expect(ONE_LINE.toUrlSafe())
        .toBe("R2.0monp2G.0monpi2G.0mpi2G");
    expect(MULTI_LINE.toUrlSafe())
        .toBe("R2.0monp2G_.0monpi2G.0mpi2G~.0monp2G.0monpi2G_.0mpi2G");
    expect(RIGHT_TO_LEFT.toUrlSafe())
        .toBe("L2.0monp2G_.0monpi2G.0mpi2G~.0monp2G.0monpi2G_.0mpi2G");
})

test("Test URL decoding of writing works.", () => {
    expect(Writing.fromUrlSafe("R2.0monp2G.0monpi2G.0mpi2G"))
        .toStrictEqual(ONE_LINE);
    expect(Writing.fromUrlSafe("R2.0monp2G_.0monpi2G.0mpi2G~.0monp2G.0monpi2G_.0mpi2G"))
        .toStrictEqual(MULTI_LINE);
    expect(Writing.fromUrlSafe("L2.0monp2G_.0monpi2G.0mpi2G~.0monp2G.0monpi2G_.0mpi2G"))
        .toStrictEqual(RIGHT_TO_LEFT);
})