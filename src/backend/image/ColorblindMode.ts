import { Canvas } from "canvas";
import convert from "color-convert";

export default function applyColorblindMode(canvas: Canvas, colorblindMode?: string) {
    const saturate = colorblindMode.endsWith("sat");
    if (saturate) {
        colorblindMode = colorblindMode.slice(0, -3);
    }

    const ctx = canvas.getContext("2d");
    
    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    console.log("Colorblindmode", canvas.width, canvas.height);

    for (let u = 0; u < canvas.width; u++) {
        for (let v = 0; v < canvas.height; v++) {
            const color = {
                r: imageData.data[(v * canvas.width + u) * 4 + 0] / 255,
                g: imageData.data[(v * canvas.width + u) * 4 + 1] / 255,
                b: imageData.data[(v * canvas.width + u) * 4 + 2] / 255,
                a: imageData.data[(v * canvas.width + u) * 4 + 3] / 255,
            }
            
            if (saturate) {
                let [h, s, v] = convert.rgb.hsv(color.r * 255, color.g * 255, color.b * 255);
                s = -0.01*s*(s-100)+s;
                let [r, g, b] = convert.hsv.rgb(h, s, v);
                color.r = r / 255;
                color.g = g / 255;
                color.b = b / 255;

            }
            if (colorblindMode === "rg") {
                applyRedGreenColorblindMode(u, v, color);
            }
            if (colorblindMode === "b") {
                applyBlueColorblindMode(u, v, color);
            }

            imageData.data[(v * canvas.width + u) * 4 + 0] = color.r * 255;
            imageData.data[(v * canvas.width + u) * 4 + 1] = color.g * 255;
            imageData.data[(v * canvas.width + u) * 4 + 2] = color.b * 255;
            imageData.data[(v * canvas.width + u) * 4 + 3] = color.a * 255;

        }
    }

    // Update the canvas
    ctx.putImageData(imageData, 0, 0);
}

function applyRedGreenColorblindMode(u: number, v: number, color: {r: number, g: number, b: number}) {
    const r = color.r;
    const g = color.g;
    const b = color.b;

    // Magenta -> Red
    if (r >= b && b >= g) {
        if ((u + v) % 2 == 0) {
            color.r = (2-r)*r + (r-1)*g;
            color.g = r*r + (1-r)*g;
            color.b = b;
        } else {
            color.r = g;
            color.g = g;
            color.b = g;
        }
    }

    // Red -> Yellow
    if (r >= g && g >= b) {
        if ((u + v) % 2 == 0) {
            color.r = (2-r)*r + (r-1)*g;
            color.g = r*r + (1-r)*g;
            color.b = g;
        } else {
            color.r = g;
            color.g = g;
            color.b = b;
        }
    }

    // Yellow -> Green
    if (g >= r && r >= b) {
        if ((u + v) % 2 == 0) {
            color.r = r;
            color.g = r;
            color.b = g;
        } else {
            color.r = g*g + (1-g)*r;
            color.g = (2-g)*g + (g-1)*r;
            color.b = b;
        }
    }

    // Green -> Cyan
    if (g >= b && b >= r) {
        if ((u + v) % 2 == 0) {
            color.r = r;
            color.g = r;
            color.b = g;
        } else {
            color.r = g*g + (1-g)*b;
            color.g = (2-g)*g + (g-1)*b;
            color.b = b;
        }
    }

    // Cyan -> Blue
    if (b >= g && g >= r) {
        if ((u + v) % 2 == 0) {
            color.r = r;
            color.g = r;
            color.b = g;
        } else {
            color.r = g;
            color.g = g;
            color.b = b;
        }
    }

    // Blue -> Purple
    if (b >= r && r >= g) {
        if ((u + v) % 2 == 0) {
            color.r = g;
            color.g = g;
            color.b = g;
        } else {
            color.r = (2-r)*r + (r-1)*g;
            color.g = r*r + (1-r)*g;
            color.b = b;
        }
    }
}


function applyBlueColorblindMode(u: number, v: number, color: {r: number, g: number, b: number}) {
    const r = color.r;
    const g = color.g;
    const b = color.b;
    // Magenta -> Red
    if (r >= b && b >= g) {
        if ((u + v) % 2 == 0) {
            color.r = r;
            color.g = g;
            color.b = g;
        } else {
            color.r = g;
            color.g = b*b + (1-b)*g;
            color.b = (2-b)*b + (b-1)*g;
        }
    }

    // Red -> Yellow
    if (r >= g && g >= b) {
        if ((u + v) % 2 == 0) {
            color.r = r;
            color.g = (2-g)*g + (g-1)*b;
            color.b = g*g + (1-g)*b;
        } else {
            color.r = g;
            color.g = b;
            color.b = b;
        }
    }

    // Yellow -> Green
    if (g >= r && r >= b) {
        if ((u + v) % 2 == 0) {
            color.r = g;
            color.g = (2-g)*g + (g-1)*b;
            color.b = g*g + (1-g)*b;
        } else {
            color.r = r;
            color.g = b;
            color.b = b;
        }
    }

    // Green -> Cyan
    if (g >= b && b >= r) {
        if ((u + v) % 2 == 0) {
            color.r = r;
            color.g = b;
            color.b = b;
        } else {
            color.r = g;
            color.g = (2-g)*g + (g-1)*b;
            color.b = g*g + (1-g)*b;
        }
    }

    // Cyan -> Blue
    if (b >= g && g >= r) {
        if ((u + v) % 2 == 0) {
            color.r = r;
            color.g = g;
            color.b = g;
        } else {
            color.r = g;
            color.g = b*b + (1-b)*g;
            color.b = (2-b)*b + (b-1)*g;
        }
    }

    // Blue -> Magenta
    if (b >= r && r >= g) {
        if ((u + v) % 2 == 0) {
            color.r = r;
            color.g = g;
            color.b = g;
        } else {
            color.r = g;
            color.g = b*b + (1-b)*g;
            color.b = (2-b)*b + (b-1)*g;
        }
    }
}