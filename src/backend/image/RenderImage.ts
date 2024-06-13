// Internal dependencies
import loadLayer from "./LoadLayer";
import Writing from "../../model/Writing";
// External dependencies
import { Canvas, createCanvas } from "canvas";

export const RENDER_IMAGE_SIZE = 20;
export const RENDER_IMAGE_MARGIN = 2;
export const RENDER_IMAGE_BACKGROUND = "rgb(49,51,56)";

/** Renders an image of a Writing, returning a Canvas containing the image. */
export default async function renderImage(writing: Writing): Promise<Canvas> {
    // Length of th e longest line
    const width = writing.lines
        .map(line => line.length)
        .reduce((l, r) => Math.max(l, r), 0);
    // Total number of lines
    const height = writing.lines.length;
    
    const canvas = createCanvas(
        RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE + RENDER_IMAGE_MARGIN) * width,
        RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE * 2 + RENDER_IMAGE_MARGIN) * height
    );
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = RENDER_IMAGE_BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < height; y++) {
        const line = writing.lines[y];
        for (let x = 0; x < line.length; x++) {
            const banner = line[x];
            if (banner == undefined) {
                continue;
            }
            for (const layer of banner.layersWithBackground()) {
                const image = await loadLayer(layer);
                ctx.drawImage(
                    image,
                    (writing.rightToLeft ?
                        RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE + RENDER_IMAGE_MARGIN) * (width - 1 - x)
                    :
                        RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE + RENDER_IMAGE_MARGIN) * x
                    ),
                    RENDER_IMAGE_MARGIN + (RENDER_IMAGE_SIZE * 2 + RENDER_IMAGE_MARGIN) * y,
                    RENDER_IMAGE_SIZE,
                    RENDER_IMAGE_SIZE * 2,
                );
            }
        }
    }
    return canvas;
}