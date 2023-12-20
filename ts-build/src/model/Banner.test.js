"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Banner_1 = require("./Banner");
// Internal dependencies
var Layer_1 = require("./Layer");
var BANNER = new Banner_1.default(0 /* Color.WHITE */, new Layer_1.default(6 /* Color.RED */, 33 /* Pattern.LEFT_SIDE */), new Layer_1.default(6 /* Color.RED */, 34 /* Pattern.HORIZONTAL_LINE */), new Layer_1.default(6 /* Color.RED */, 35 /* Pattern.RIGHT_SIDE */), new Layer_1.default(6 /* Color.RED */, 36 /* Pattern.TOP_SIDE */), new Layer_1.default(0 /* Color.WHITE */, 1 /* Pattern.SQUARE_BORDER */));
test("Test fetching URL path to Banner textures.", function () {
    expect(BANNER.imagePath())
        .toBe("/󏿷󏿷󏿷󏿷󏿷.png"); // [BANNER]
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
test("Test BannerFont decoding of Banners fails with two backspaces.", function () {
    expect(function () { return Banner_1.default.fromString("󏿷󏿷"); }) // E000 CFFF9 CFFF9 E631
        .toThrow(Error);
});
test("Test BannerFont decoding of Banners fails with no background.", function () {
    expect(function () { return Banner_1.default.fromString("󏿷"); }) // E631 CFFF9 E631
        .toThrow(Error);
});
test("Test BannerFont decoding of Banners fails with terminating string.", function () {
    expect(function () { return Banner_1.default.fromString("󏿷"); }) // E000 CFFF9
        .toThrow(Error);
});
