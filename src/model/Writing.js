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
}