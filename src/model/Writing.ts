// Internal dependencies
import Banner from "./Banner";
// External dependencies
import {immerable} from "immer";

export const CODEPOINT_WRITING_END = 0xE00A;
export const CODEPOINT_WRITING_DIR_LTR = 0xE00E;
export const CODEPOINT_WRITING_DIR_RTL = 0xE00F;

/**
 * A block of Writing consisting of many lines of Banners with spaces.
 */
export default class Writing {
    [immerable] = true;

    rightToLeft: boolean;
    lines: (Banner | undefined)[][]

    /** Creates a new Writing with a direction and any amount of lines. */
    constructor(rightToLeft: boolean, ...lines: (Banner | undefined)[][]) {
        this.rightToLeft = rightToLeft;
        this.lines = lines ?? [];
    }

    /** Returns the URL path to an image of this Writing. */
    imagePath(): string {
        return `/image/${this.toString()}.png`;
    }

    /** Returns the BannerFont string which encodes this Writing. */
    toString(): string {
        let str = String.fromCodePoint(this.rightToLeft ? CODEPOINT_WRITING_DIR_RTL : CODEPOINT_WRITING_DIR_LTR);
        for (let i = 0; i < this.lines.length; i++) {
            if (i != 0) {
                str += "\n";
            }
            const line = this.lines[i];
            for (const banner of this.rightToLeft ? line.slice().reverse() : line) {
                str += banner ? banner.toString() : " ";
            }
        }
        return str + String.fromCodePoint(CODEPOINT_WRITING_END);
    }

    /**
     * Creates a Writing from a BannerFont string, starting from a given index.
     * Returns the parsed object as well as the following String index.
     * This index can be used to parse the next object in the String.
     */
    static fromString(str: string, index?: number): [Writing, number] {
        index ??= 0;

        let rightToLeft = false; // default false with legacy writing
        const codePoint = str.codePointAt(index);
        if (codePoint == CODEPOINT_WRITING_DIR_LTR) {
            rightToLeft = false;
            index++;
        } else
         if (codePoint == CODEPOINT_WRITING_DIR_RTL) {
            rightToLeft = true;
            index++;
        }
        
        let lines: (Banner | undefined)[][] = [];
        let line: (Banner | undefined)[] = [];
        while (true) {
            const codePoint = str.codePointAt(index);
            // End of writing / file
            if (codePoint == undefined) {
                break;
            }
            if (codePoint == CODEPOINT_WRITING_END) {
                index++;
                break;
            }
            // Newline
            if (codePoint == 0x0A) {
                index++;
                lines.push(line);
                line = [];
                continue;
            }
            if (codePoint == 0x0D) {
                index++;

                const nextCodePoint = str.codePointAt(index);
                if (nextCodePoint != 0x0A) {
                    throw new Error("Carriage return was not followed by a line feed");
                }
                index++;

                lines.push(line);
                line = [];
                continue;
            }
            // Space
            if (codePoint == 0x20) {
                index++;
                line.push(undefined);
                continue;
            }
            // Banner
            const [banner, newIndex] = Banner.fromString(str, index);
            line.push(banner);
            index = newIndex;
        }
        lines.push(line);
        if (rightToLeft) {
            for (const line of lines) {
                line.reverse();
            }
        }

        const writing = new Writing(rightToLeft, ...lines);
        return [writing, index];
    }

    /** Creates an arbitrary space character jumping the specified number of banners. */
    static _generateSpace(size: number): string {
        return String.fromCodePoint(0xD0000 + size * 9);
    }

    /** Optimizes a single group of banners using arbitrary-space characters. */
    static _optimizeBanners(banners: Banner[]): string {
        let str = "";
        // The maximum layer count of all banners in the list.
        let maxLayer = 0;
        // The number of "skips" (extra background layers) to add to each banner.
        let skipCounts: number[] = [];
        for (const banner of banners) {
            // Begin by adding all background layers
            str += banner.backgroundLayer().toString();
            maxLayer = Math.max(maxLayer, banner.layers.length)
            skipCounts.push(0);
        }
        // The current position of the cursor while typing
        let position = banners.length;
        // Iterate through each banner in each layer
        for (let layer = 0; layer <= maxLayer; layer++) {
            for (let i = 0; i < banners.length; i++) {
                const banner = banners[i];
                if (layer < banner.layers.length) {
                    // If you would need to skip exactly one banner, add a skip.
                    // This is because adding 1 layer is 1 char less than a space.
                    if (position == i - 1) {
                        skipCounts[position] += 1;
                    }
                    position = i + 1;
                }
            }
        }
        // Reset the position now that skip counts have been calculated
        position = banners.length;
        for (let layer = 0; layer <= maxLayer; layer++) {
            for (let i = 0; i < banners.length; i++) {
                const banner = banners[i];
                // If the banner needs to be written
                if (layer - skipCounts[i] < banner.layers.length) {
                    // Move to the correct position if needed
                    if (position != i) {
                        str += Writing._generateSpace(i - position);
                    }
                    // Add a "skip" or the next layer of the banner
                    if (layer - skipCounts[i] < 0) {
                        str += banner.backgroundLayer().toString();
                    } else {
                        str += banner.layers[layer - skipCounts[i]].toString();
                    }
                    position = i + 1;
                }
            }
        }
        return str;
    }

    /**
     * Returns a BannerFont string that represents this Writing.
     * This string will be optimized to minimize the number of characters used.
     * The optimization uses arbitrary-sized space characters and is only
     * guaranteed to work inside Minecraft using the BannerFont resource pack.
     * The optimization will also not be able to be decoded using fromString().
     * Groups of banners between spaces and newlines will be optimized separately.
     */
    toOptimizedString(): string {
        return this.lines.map(line => {
            if (this.rightToLeft) {
                line = line.slice().reverse();
            }
            // split line by spaces
            let groups: Banner[][] = [[]];
            for (const banner of line) {
                if (banner == undefined) {
                    groups.push([]);
                } else {
                    groups.at(-1)!.push(banner);
                }
            }
            // optimize groups one at a time
            return groups.map(group => Writing._optimizeBanners(group))
                .join(" ")
        }).join("\n");
    }
}