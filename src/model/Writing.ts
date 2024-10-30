// Internal dependencies
import Banner from "./Banner";
// External dependencies
import {immerable} from "immer";
import Color from "./Color";
import Pattern from "./Pattern";
import Layer from "./Layer";

export const CODEPOINT_WRITING_NEWLINE = 0xE00A;
export const CODEPOINT_WRITING_END = 0xE00D;
export const CODEPOINT_WRITING_DIR_LTR = 0xE00E;
export const CODEPOINT_WRITING_DIR_RTL = 0xE00F;

export const URLSAFE_DIR_LTR = "R";
export const URLSAFE_DIR_RTL = "L";
export const URLSAFE_NEWLINE = "~";
export const URLSAFE_SPACE = "_";
export const URLSAFE_BACKGROUND = ".";
export const URLSAFE_COLORS = "0123456789ABCDEF";
export const URLSAFE_PATTERNS = URLSAFE_BACKGROUND + "GHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

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
        return `/image/${this.toUrlSafe()}.png`
            .replaceAll(/\n| /g, "_");
    }

    /** Returns the BannerFont string which encodes this Writing. */
    toString(): string {
        let str = String.fromCodePoint(this.rightToLeft ? CODEPOINT_WRITING_DIR_RTL : CODEPOINT_WRITING_DIR_LTR);
        for (let i = 0; i < this.lines.length; i++) {
            if (i != 0) {
                str += String.fromCodePoint(CODEPOINT_WRITING_NEWLINE) + "\n";
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
            if (codePoint == CODEPOINT_WRITING_NEWLINE) {
                index++;

                if (str.codePointAt(index) == 0x0D) {
                    index++;
                }
                if (str.codePointAt(index) == 0x0A
                    || str.codePointAt(index) == 0x20
                    || str.codePointAt(index) == 0x5F) {
                    index++;
                }

                lines.push(line);
                line = [];
                continue;
            }
            // Space
            if (codePoint == 0x20 || codePoint == 0x5F) {
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

    /** Converts the Writing to a compact sequence of URL-safe characters. */
    toUrlSafe(): string {
        let str = this.rightToLeft ? URLSAFE_DIR_RTL : URLSAFE_DIR_LTR;
        // The currently used color. This is written only when it changes.
        // This helps as banners will often use multiple of the same color in a row,
        // and this will save characters by needing to write colors less often.
        let color = Color.WHITE;
        for (let i = 0; i < this.lines.length; i++) {
            if (i !== 0) {
                str += URLSAFE_NEWLINE;
            }
            const line = this.lines[i];
            for (const banner of this.rightToLeft ? line.slice().reverse() : line) {
                if (banner === undefined) {
                    str += URLSAFE_SPACE;
                    continue;
                }
                for (const layer of banner.layersWithBackground()) {
                    if (layer.color !== color) {
                        // Change the color.
                        color = layer.color;
                        str += URLSAFE_COLORS.charAt(color);
                    }
                    // URLSAFE_PATTERNS covers up to 46 patterns, which is a bit of leeway for new patterns.
                    str += URLSAFE_PATTERNS.charAt(layer.pattern);
                }
            }
        }

        return str;
    }
    /**
     * Creates a Writing from a URL-safe string.
     */
    static fromUrlSafe(str: string): Writing {
        let color = Color.WHITE;
        
        const rightToLeft = str[0] === URLSAFE_DIR_RTL;
        let lines: (Banner | undefined)[][] = [[]];
        for (const char of str.substring(1)) {
            const line = lines[lines.length - 1];
            if (char === URLSAFE_NEWLINE) {
                // Newline
                lines.push([]);
            } else if (char === URLSAFE_SPACE) {
                // Space
                line.push(undefined);
            } else if (char === URLSAFE_BACKGROUND) {
                // Background
                line.push(new Banner(color));
            } else if (URLSAFE_COLORS.includes(char)) {
                color = URLSAFE_COLORS.indexOf(char);
            } else if (URLSAFE_PATTERNS.includes(char)) {
                const pattern: Pattern = URLSAFE_PATTERNS.indexOf(char);
                if (line.length === 0 || line[line.length - 1] === undefined) {
                    throw new Error("Writing cannot contain a banner with no background layer");
                }
                line[line.length - 1].layers.push(new Layer(color, pattern));
            } else {
                throw new Error("Unrecognized character detected");
            }
        }
        
        if (rightToLeft) {
            for (const line of lines) {
                line.reverse();
            }
        }

        return new Writing(rightToLeft, ...lines);
    }

    /** Creates an arbitrary space character jumping the specified number of banners. */
    static _generateSpace(size: number): string {
        return String.fromCodePoint(0xF040 + size);
    }

    /** Optimizes a single group of banners using arbitrary-space characters. */
    static _optimizeBanners(banners: Banner[]): string {
        let str = "";
        // The maximum layer count of all banners in the list.
        let maxLayer = 0;
        // The number of "skips" (extra background layers) to add to each banner.
        for (const banner of banners) {
            // Begin by adding all background layers
            str += banner.backgroundLayer().toString();
            maxLayer = Math.max(maxLayer, banner.layers.length)
        }
        // The current position of the cursor while typing
        let position = banners.length;
        position = banners.length;
        for (let layer = 0; layer <= maxLayer; layer++) {
            for (let i = 0; i < banners.length; i++) {
                const banner = banners[i];
                // If the banner needs to be written
                if (layer < banner.layers.length) {
                    // Move to the correct position if needed
                    if (position != i) {
                        str += Writing._generateSpace(i - position);
                    }
                    str += banner.layers[layer].toString();
                    position = i + 1;
                }
            }
        }

        // Move to the end of the group, if it is required that it end at the finish.
        if (position != banners.length) {
            str += Writing._generateSpace(banners.length - position);
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
        const groups = this.lines.flatMap(line => {
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
            
            return groups;
        });
        
        if (groups.length == 0) {
            return "";
        }
        const lastOptimized = Writing._optimizeBanners(groups[groups.length - 1]);
        if (groups.length == 1) {
            return lastOptimized;
        }
        // optimize groups one at a time
        return groups.slice(0, -1).map(group => Writing._optimizeBanners(group)).join(" ") + " " + lastOptimized
    }

    /**
     * Returns a set of Minecraft commands that gives the player all Banners in this Writing.
     */
    toCommandCode(): string {
        let commands = [];
        for (const line of this.lines) {
            for (const banner of line) {
                if (banner !== undefined) {
                    commands.push(banner.toCommandCode())
                }
            }
        }
        return commands.join("\n");
    }
}