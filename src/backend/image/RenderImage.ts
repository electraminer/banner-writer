// Internal dependencies
import loadLayer from "./LoadLayer";
import Writing from "../../model/Writing";
// External dependencies
import { Canvas, createCanvas } from "canvas";

export const RENDER_IMAGE_SIZE = 20;
export const RENDER_IMAGE_MARGIN = 2;
export const RENDER_IMAGE_BACKGROUND = "rgb(49,51,56)";

const MAX_LINE_LENGTH = 64;

/** Renders an image of a Writing, returning a Canvas containing the image. */
export default async function renderImage(writing: Writing, colorblindMode?: string): Promise<Canvas> {
    // Length of the longest line
    let width = writing.lines
        .map(line => line.length)
        .reduce((l, r) => Math.max(l, r), 0);
    let height = writing.lines.length;
    if (width > MAX_LINE_LENGTH) {
        width = MAX_LINE_LENGTH;
        for (const line of writing.lines) {
            const numOverflows = Math.ceil((line.length) / MAX_LINE_LENGTH)
            if (numOverflows > 1) {
                height += numOverflows - 1;
            }
        }
    }
    // Total number of lines
    
    const canvas = createCanvas(
        RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE + RENDER_IMAGE_MARGIN) * width,
        RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE * 2 + RENDER_IMAGE_MARGIN) * height
    );
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = RENDER_IMAGE_BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let overflows = 0;
    for (let y = 0; y < writing.lines.length; y++) {
        const line = writing.lines[y];
        for (let x = 0; x < line.length; x++) {
            const banner = line[x];
            if (banner === undefined) {
                continue;
            }
            if (x % MAX_LINE_LENGTH === 0 && x !== 0) {
                overflows += 1;
            }
            for (const layer of banner.layersWithBackground()) {
                const image = await loadLayer(layer, colorblindMode);
                // Effective x and y, after taking into account overflows
                const ex = x % MAX_LINE_LENGTH;
                const ey = y + overflows;
                ctx.drawImage(
                    image,
                    (writing.rightToLeft ?
                        RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE + RENDER_IMAGE_MARGIN) * (width - 1 - ex)
                    :
                        RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE + RENDER_IMAGE_MARGIN) * ex
                    ),
                    RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE * 2 + RENDER_IMAGE_MARGIN) * ey,
                    RENDER_IMAGE_SIZE,
                    RENDER_IMAGE_SIZE * 2,
                );
            }
        }
    }
    return canvas;
}