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
        return `/${this.toString()}.png`;
    }

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
        
        let lines = [];
        let line = [];
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

    // optimizedCharacters() {
    //     let banners = this.banners;
    //     if (this.rightToLeft) {
    //         banners = banners.slice().reverse();
    //     }
    //     const generateSpace = (size) => String.fromCodePoint(0xD0000 + size * 9);

    //     let characters = '';
    //     let maxLayer = 0;
    //     let skipCounts = [];
    //     for (const banner of banners) {
    //         characters += banner.backgroundLayer().characters();
    //         maxLayer = Math.max(maxLayer, banner.layers.length)
    //         skipCounts.push(0);
    //     }
    //     console.log(skipCounts);    
    //     let position = banners.length;
    //     for (let layer = 0; layer <= maxLayer; layer++) {
    //         for (let i = 0; i < banners.length; i++) {
    //             const banner = banners[i];
    //             if (layer < banner.layers.length) {
    //                 if (position == i - 1) {
    //                     skipCounts[position] += 1;
    //                 }
    //                 position = i + 1;
    //             }
    //         }
    //     }
    //     position = banners.length;
    //     for (let layer = 0; layer <= maxLayer; layer++) {
    //         for (let i = 0; i < banners.length; i++) {
    //             const banner = banners[i];
    //             if (layer - skipCounts[i] < banner.layers.length) {
    //                 if (position != i) {
    //                     characters += generateSpace(i - position);
    //                 }
    //                 if (layer - skipCounts[i] < 0) {
    //                     characters += banner.backgroundLayer().characters();
    //                 } else {
    //                     characters += banner.layers[layer - skipCounts[i]].characters();
    //                 }
    //                 position = i + 1;
    //             }
    //         }
    //     }

    //     return characters;
    // }
}