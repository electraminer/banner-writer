import Layer from "./Layer";
// Internal dependencies
import Color from "./Color";
import Pattern from "./Pattern";

const BG_LAYER = new Layer(Color.WHITE, Pattern.BACKGROUND);
const LAYER = new Layer(Color.RED, Pattern.FORWARD_SLASH);

test("Test fetching URL path to statically served Layer textures.", () => {
    expect(BG_LAYER.staticImagePath())
        .toBe("/textures/000.png");
    expect(LAYER.staticImagePath())
        .toBe("/textures/631.png");
});

test("Test fetching URL path to dynamically served Layer textures.", () => {
    expect(BG_LAYER.imagePath())
        .toBe("/.png"); // E000
    expect(LAYER.imagePath())
        .toBe("/.png"); // E631
});

test("Test BannerFont encoding of Layers.", () => {
    expect(BG_LAYER.toString())
        .toBe(""); // E000
    expect(LAYER.toString())
        .toBe(""); // E631
});

test("Test BannerFont decoding of Layers.", () => {
    expect(Layer.fromString("")) // E000
        .toStrictEqual([BG_LAYER, 1]);
    expect(Layer.fromString("󏿷")) // E000 CFFF9 E631
        .toStrictEqual([BG_LAYER, 1]);
    expect(Layer.fromString("󏿷", 3)) // E000 CFFF9 E631
        .toStrictEqual([LAYER, 4]);
});

test("Test BannerFont decoding of Layers fails on non-BannerFont character.", () => {
    expect(() => Layer.fromString("abc"))
        .toThrow(Error);
});

test("Test BannerFont decoding of Layers fails on SpaceFont character.", () => {
    expect(() => Layer.fromString("󏿷", 1)) // E000 CFFF9 E631
        .toThrow(Error);
});

test("Test BannerFont decoding of Layers fails on misaligned character.", () => {
    expect(() => Layer.fromString("󏿷", 2)) // E000 CFFF9 E631
        .toThrow(Error);
});

test("Test BannerFont decoding of Layers fails on invalid pattern.", () => {
    expect(() => Layer.fromString("")) // EF0F
        .toThrow(Error);
    expect(() => Layer.fromString("")) // EF99
        .toThrow(Error);
});

test("Test BannerFont decoding of Layers fails on empty string.", () => {
    expect(() => Layer.fromString(""))
        .toThrow(Error);
});