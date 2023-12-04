const Banner = require("./Banner.js");
const Layer = require("./Layer.js");

const Immer = require("immer");

module.exports = class Writing {
    [Immer.immerable] = true;

    constructor(rightToLeft) {
        this.rightToLeft = rightToLeft;
        this.lines = [];
    }

    characters() {
        let characters = '';
        for (const line of this.lines) {
            for (const banner of this.rightToLeft ? line.slice().reverse() : line) {
                characters += banner ? banner.characters() : ' ';
            }
            characters += '\n';
        }
        return characters;
    }

    static fromCharacters(characters) {
        //TODO add right to left detection
        let writing = new Writing(false);
        for (const charLine of characters.split("\n")) {
            const line = [];
            for (const char of characters) {
                if (char == ' ') {
                    line.push(undefined);
                    continue;
                }
                const code = char.charCodeAt();
                if (code < 0xE000 || code >= 0xF000) {
                    continue;
                }
                const background = (code & 0xF00) / 0x100;
                const pattern = (code & 0xF0) / 0x10 * 10 + (code & 0xF);
                if (pattern == 0) {
                    if (writing.rightToLeft) {
                        line.unshift(new Banner(background));
                    } else {
                        line.push(new Banner(background));
                    }
                } else {
                    line.at(writing.rightToLeft ? 0 : -1).addLayer(new Layer(background, pattern));
                }
            }
            writing.lines.push(line);
        }
        
        return writing;
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