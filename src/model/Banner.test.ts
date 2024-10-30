import Banner from "./Banner";
// Internal dependencies
import Layer from "./Layer";
import Color from "./Color";
import Pattern from "./Pattern";

const BANNER = new Banner(
    Color.WHITE,
    new Layer(Color.RED, Pattern.LEFT_STRIPE),
    new Layer(Color.RED, Pattern.HORIZONTAL_STRIPE),
    new Layer(Color.RED, Pattern.RIGHT_STRIPE),
    new Layer(Color.RED, Pattern.TOP_STRIPE),
    new Layer(Color.WHITE, Pattern.SQUARE_BORDER),
);

test("Test fetching URL path to Banner textures.", () => {
    expect(BANNER.imagePath())
        .toBe("/image/R.6mnop0G.png"); // [BANNER]
});



test("Test /getbannercode encoding of Banners.", () => {
    expect(BANNER.toCode())
        .toBe("b0ls14ms14rs14ts14bo0");
})

test("Test /getbannercode decoding of Banners.", () => {
    expect(Banner.fromCode("b0ls14ms14rs14ts14bo0 b0dls14"))
        .toStrictEqual([BANNER, 21]);
    expect(Banner.fromCode("b0dls14 b0ls14ms14rs14ts14bo0", 8))
        .toStrictEqual([BANNER, 29]);
})

test("Test /getbannercode decoding of Banners fails on invalid codes.", () => {
    expect(() => Banner.fromCode("b0invalid0"))
        .toThrow(Error);
    expect(() => Banner.fromCode("b16"))
        .toThrow(Error);
})

test("Test /getbannercode decoding of Banners fails on no background.", () => {
    expect(() => Banner.fromCode("ls14ms14rs14ts14bo0"))
        .toThrow(Error);
})

test("Test /getbannercode decoding of Banners fails on missing color.", () => {
    expect(() => Banner.fromCode("b0b"))
        .toThrow(Error);
})

test("Test /getbannercode decoding of Banners fails on empty string.", () => {
    expect(() => Banner.fromCode(""))
        .toThrow(Error);
})

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

test("Test BannerFont decoding of Banners fails on two backspaces.", () => {
    expect(() => Banner.fromString("󏿷󏿷")) // E000 CFFF9 CFFF9 E631
        .toThrow(Error);
});

test("Test BannerFont decoding of Banners fails on no background.", () => {
    expect(() => Banner.fromString("󏿷")) // E631 CFFF9 E631
        .toThrow(Error);
});

test("Test BannerFont decoding of Banners fails on terminating string.", () => {
    expect(() => Banner.fromString("󏿷")) // E000 CFFF9
        .toThrow(Error);
});

test("Test BannerFont decoding of Banners fails on empty string.", () => {
    expect(() => Banner.fromString(""))
        .toThrow(Error);
})

test("Test BannerFont decoding of Banners works with new backspace.", () => {
    expect(Banner.fromString(""))
        .toStrictEqual([BANNER, 11]);
});

test("Test command generation of Banners", () => {
    expect(BANNER.toCommandCode())
        .toEqual(`/give @p white_banner[banner_patterns=[\
{pattern:"minecraft:stripe_left",color:"red"},\
{pattern:"minecraft:stripe_middle",color:"red"},\
{pattern:"minecraft:stripe_right",color:"red"},\
{pattern:"minecraft:stripe_top",color:"red"},\
{pattern:"minecraft:border",color:"white"}]]`);
});