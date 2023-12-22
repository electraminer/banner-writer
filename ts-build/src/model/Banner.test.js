"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Banner_1 = require("./Banner");
// Internal dependencies
var Layer_1 = require("./Layer");
var BANNER = new Banner_1.default(0 /* Color.WHITE */, new Layer_1.default(6 /* Color.RED */, 33 /* Pattern.LEFT_STRIPE */), new Layer_1.default(6 /* Color.RED */, 34 /* Pattern.HORIZONTAL_STRIPE */), new Layer_1.default(6 /* Color.RED */, 35 /* Pattern.RIGHT_STRIPE */), new Layer_1.default(6 /* Color.RED */, 36 /* Pattern.TOP_STRIPE */), new Layer_1.default(0 /* Color.WHITE */, 1 /* Pattern.SQUARE_BORDER */));
test("Test fetching URL path to Banner textures.", function () {
    expect(BANNER.imagePath())
        .toBe("/󏿷󏿷󏿷󏿷󏿷.png"); // [BANNER]
});
test("Test /getbannercode encoding of Banners.", function () {
    expect(BANNER.toCode())
        .toBe("b0ls14ms14rs14ts14bo0");
});
test("Test /getbannercode decoding of Banners.", function () {
    expect(Banner_1.default.fromCode("b0ls14ms14rs14ts14bo0 b0dls14"))
        .toStrictEqual([BANNER, 21]);
    expect(Banner_1.default.fromCode("b0dls14 b0ls14ms14rs14ts14bo0", 8))
        .toStrictEqual([BANNER, 29]);
});
test("Test /getbannercode decoding of Banners fails on invalid codes.", function () {
    expect(function () { return Banner_1.default.fromCode("b0invalid0"); })
        .toThrow(Error);
    expect(function () { return Banner_1.default.fromCode("b16"); })
        .toThrow(Error);
});
test("Test /getbannercode decoding of Banners fails on no background.", function () {
    expect(function () { return Banner_1.default.fromCode("ls14ms14rs14ts14bo0"); })
        .toThrow(Error);
});
test("Test /getbannercode decoding of Banners fails on missing color.", function () {
    expect(function () { return Banner_1.default.fromCode("b0b"); })
        .toThrow(Error);
});
test("Test /getbannercode decoding of Banners fails on empty string.", function () {
    expect(function () { return Banner_1.default.fromCode(""); })
        .toThrow(Error);
});
test("Test BannerFont encoding of Banners.", function () {
    expect(BANNER.toString())
        .toBe("󏿷󏿷󏿷󏿷󏿷"); // [BANNER]
});
test("Test BannerFont decoding of Banners.", function () {
    expect(Banner_1.default.fromString("󏿷󏿷󏿷󏿷󏿷󏿷")) // [BANNER] E000 CFFF9 E631
        .toStrictEqual([BANNER, 16]);
    expect(Banner_1.default.fromString("󏿷󏿷󏿷󏿷󏿷󏿷", 4)) // E000 CFFF9 E631 [BANNER]
        .toStrictEqual([BANNER, 20]);
});
test("Test BannerFont decoding of Banners fails on non-BannerFont.", function () {
    expect(function () { return Banner_1.default.fromString("abc"); })
        .toThrow(Error);
});
test("Test BannerFont decoding of Banners fails on two backspaces.", function () {
    expect(function () { return Banner_1.default.fromString("󏿷󏿷"); }) // E000 CFFF9 CFFF9 E631
        .toThrow(Error);
});
test("Test BannerFont decoding of Banners fails on no background.", function () {
    expect(function () { return Banner_1.default.fromString("󏿷"); }) // E631 CFFF9 E631
        .toThrow(Error);
});
test("Test BannerFont decoding of Banners fails on terminating string.", function () {
    expect(function () { return Banner_1.default.fromString("󏿷"); }) // E000 CFFF9
        .toThrow(Error);
});
test("Test BannerFont decoding of Banners fails on empty string.", function () {
    expect(function () { return Banner_1.default.fromString(""); })
        .toThrow(Error);
});
