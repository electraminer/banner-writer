import Banner from './Banner.js';
import Layer from './Layer.js';

import {immerable} from 'immer';

export default class Writing {
    [immerable] = true;

    constructor(rightToLeft, cursor, ...banners) {
        this.rightToLeft = rightToLeft;
        if (cursor == undefined) {
            cursor = 0;
        }
        this.cursor = cursor;
        this.banners = banners;
    }

    addBanner(banner) {
        this.banners.splice(this.cursor, 0, banner);
        this.cursor += 1;
    }

    backspace() {
        if (this.cursor > 0) {
            this.cursor -= 1;
            this.banners.splice(this.cursor, 1);
        }
    }

    moveCursor(index) {
        this.cursor = index;
    }

    characters() {
        let characters = '';
        for (const banner of this.rightToLeft ? this.banners.slice().reverse() : this.banners) {
            characters += banner.characters();
        }
        return characters;
    }

    static fromCharacters(characters, rightToLeft) {
        let banners = [];
        for (const char of characters) {
            const code = char.charCodeAt();
            if (code < 0xE000 || code >= 0xF000) {
                continue;
            }
            const background = (code & 0xF00) / 0x100;
            const pattern = (code & 0xF0) / 0x10 * 10 + (code & 0xF);
            if (pattern == 0) {
                if (rightToLeft) {
                    banners.unshift(new Banner(background));
                } else {
                    banners.push(new Banner(background));
                }
            } else {
                banners.at(rightToLeft ? 0 : -1).addLayer(new Layer(background, pattern));
            }
        }
        return banners;
    }

    optimizedCharacters() {
        let banners = this.banners;
        if (this.rightToLeft) {
            banners = banners.slice().reverse();
        }
        const generateSpace = (size) => String.fromCodePoint(0xD0000 + size * 9);

        let characters = '';
        let maxLayer = 0;
        let skipCounts = [];
        for (const banner of banners) {
            characters += banner.backgroundLayer().characters();
            maxLayer = Math.max(maxLayer, banner.layers.length)
            skipCounts.push(0);
        }
        console.log(skipCounts);    
        let position = banners.length;
        for (let layer = 0; layer <= maxLayer; layer++) {
            for (let i = 0; i < banners.length; i++) {
                const banner = banners[i];
                if (layer < banner.layers.length) {
                    if (position == i - 1) {
                        skipCounts[position] += 1;
                    }
                    position = i + 1;
                }
            }
        }
        position = banners.length;
        for (let layer = 0; layer <= maxLayer; layer++) {
            for (let i = 0; i < banners.length; i++) {
                const banner = banners[i];
                if (layer - skipCounts[i] < banner.layers.length) {
                    if (position != i) {
                        characters += generateSpace(i - position);
                    }
                    if (layer - skipCounts[i] < 0) {
                        characters += banner.backgroundLayer().characters();
                    } else {
                        characters += banner.layers[layer - skipCounts[i]].characters();
                    }
                    position = i + 1;
                }
            }
        }

        return characters;
    }
}