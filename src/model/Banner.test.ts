import Banner from "./Banner";
// Internal dependencies
import Layer from "./Layer";
import Color from "./Color";
import Pattern from "./Pattern";

const BANNER = new Banner(
    Color.WHITE,
    new Layer(Color.RED, Pattern.LEFT_SIDE),
    new Layer(Color.RED, Pattern.HORIZONTAL_LINE),
    new Layer(Color.RED, Pattern.RIGHT_SIDE),
    new Layer(Color.RED, Pattern.TOP_SIDE),
    new Layer(Color.WHITE, Pattern.SQUARE_BORDER),
);

test("Test fetching URL path to Banner textures.", () => {
    expect(BANNER.imagePath())
        .toBe("/󏿷󏿷󏿷󏿷󏿷.png"); // [BANNER]
});

test("Test BannerFont encoding of Banners.", () => {
    expect(BANNER.toString())
        .toBe("󏿷󏿷󏿷󏿷󏿷"); // [BANNER]
});

test("Test BannerFont decoding of Banners.", () => {
    expect(Banner.fromString("󏿷󏿷󏿷󏿷󏿷󏿷")) // [BANNER] E000 CFFF9 E631
        .toStrictEqual([BANNER, 16]);
    expect(Banner.fromString("󏿷󏿷󏿷󏿷󏿷󏿷", 4)) // E000 CFFF9 E631 [BANNER]
        .toStrictEqual([BANNER, 20]);
});

test("Test BannerFont decoding of Banners fails on non-BannerFont.", () => {
    expect(() => Banner.fromString("abc"))
        .toThrow(Error);
});

test("Test BannerFont decoding of Banners fails with two backspaces.", () => {
    expect(() => Banner.fromString("󏿷󏿷")) // E000 CFFF9 CFFF9 E631
        .toThrow(Error);
});

test("Test BannerFont decoding of Banners fails with no background.", () => {
    expect(() => Banner.fromString("󏿷")) // E631 CFFF9 E631
        .toThrow(Error);
});

test("Test BannerFont decoding of Banners fails with terminating string.", () => {
    expect(() => Banner.fromString("󏿷")) // E000 CFFF9
        .toThrow(Error);
});