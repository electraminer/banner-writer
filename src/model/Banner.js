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
}