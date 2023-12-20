import Layer from './Layer.js';
import Writing from './Writing.js';

import {immerable} from 'immer';

const MAX_LAYERS = 6;

export default class Banner {
    [immerable] = true;

    constructor(background, ...layers) {
        this.background = background;
        this.layers = layers;
    }

    backgroundLayer() {
        return new Layer(this.background, 0);
    }

    layersWithBackground() {
        return [this.backgroundLayer()].concat(this.layers);
    }

    setBackground(color) {
        this.background = color;
    }
    
    setLayerColor(index, color) {
        this.layers[index].color = color;
    }

    addLayer(layer) {
        if (this.layers.length < MAX_LAYERS) {
            this.layers.push(layer);
        }
    }

    removeLayer(index) {
        this.layers.splice(index, 1)
    }

    swapLayers(index) {
        const temp = this.layers[index];
        this.layers[index] = this.layers[index + 1];
        this.layers[index + 1] = temp;
    }

    characters() {
        let characters = "";
        characters += this.backgroundLayer().characters();
        for (const layer of this.layers) {
            characters += String.fromCodePoint(0xCFFF7);
            characters += layer.characters();
        }
        return characters;
    }

    static fromCharacters(characters) {
        return Writing.fromCharacters(characters)[0];
    }

    static fromBannerCode(code) {
        console.log(code);
        const patternCodes = `b
            bo|bri|mc|cre|cr|cbo|ld|rud|lud|rd
            flo|glb|gra|gru|hh|hhb|vh|vhr|moj|pig
            mr|sku|ss|bl|br|tl|tr|sc|bs|cs
            dls|drs|ls|ms|rs|ts|bt|tt|bts|tts
        `.trim().split(/\||\n/).map(s=>s.trim());
        const colorCodes = `
            0|8|7|15|4|1|14|12
            5|13|3|9|11|6|2|10
        `.trim().split(/\||\n/).map(s=>s.trim());

        let background = undefined;
        let layers = [];
        for (const [s, p, c] of [...code.matchAll(/([a-z]+)([0-9]+)/g)]) {
            let pattern = patternCodes.indexOf(p);
            let color = colorCodes.indexOf(c);

            if (pattern == 0) {
                background = color;
            } else {
                layers.push(new Layer(color, pattern));
            }
        }

        return new Banner(background, ...layers);
    }
}