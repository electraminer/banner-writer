"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Layer_1 = require("./Layer");
var BG_LAYER = new Layer_1.default(0 /* Color.WHITE */, 0 /* Pattern.BACKGROUND */);
var LAYER = new Layer_1.default(6 /* Color.RED */, 31 /* Pattern.FORWARD_SLASH */);
test("Test fetching URL path to statically served Layer textures.", function () {
    expect(BG_LAYER.staticImagePath())
        .toBe("/textures/000.png");
    expect(LAYER.staticImagePath())
        .toBe("/textures/631.png");
});
test("Test fetching URL path to dynamically served Layer textures.", function () {
    expect(BG_LAYER.imagePath())
        .toBe("/.png"); // E000
    expect(LAYER.imagePath())
        .toBe("/.png"); // E631
});
test("Test BannerFont encoding of Layers.", function () {
    expect(BG_LAYER.toString())
        .toBe(""); // E000
    expect(LAYER.toString())
        .toBe(""); // E631
});
test("Test BannerFont decoding of Layers.", function () {
    expect(Layer_1.default.fromString("")) // E000
        .toStrictEqual([BG_LAYER, 1]);
    expect(Layer_1.default.fromString("󏿷")) // E000 CFFF9 E631
        .toStrictEqual([BG_LAYER, 1]);
    expect(Layer_1.default.fromString("󏿷", 3)) // E000 CFFF9 E631
        .toStrictEqual([LAYER, 4]);
});
test("Test BannerFont decoding of Layers fails on non-BannerFont character.", function () {
    expect(function () { return Layer_1.default.fromString("abc"); })
        .toThrow(Error);
});
test("Test BannerFont decoding of Layers fails on SpaceFont character.", function () {
    expect(function () { return Layer_1.default.fromString("󏿷", 1); }) // E000 CFFF9 E631
        .toThrow(Error);
});
test("Test BannerFont decoding of Layers fails on misaligned character.", function () {
    expect(function () { return Layer_1.default.fromString("󏿷", 2); }) // E000 CFFF9 E631
        .toThrow(Error);
});
test("Test BannerFont decoding of Layers fails on invalid pattern.", function () {
    expect(function () { return Layer_1.default.fromString(""); }) // EF0F
        .toThrow(Error);
    expect(function () { return Layer_1.default.fromString(""); }) // EF99
        .toThrow(Error);
});
test("Test BannerFont decoding of Layers fails on empty string.", function () {
    expect(function () { return Layer_1.default.fromString(""); })
        .toThrow(Error);
});
