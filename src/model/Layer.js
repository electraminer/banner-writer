import {immerable} from 'immer';

export default class Layer {
    [immerable] = true;

    constructor(color, pattern) {
        this.color = color;
        this.pattern = pattern;
    }

    code() {
        return this.color.toString(16) + this.pattern.toString(10).padStart(2, '0');
    }

    texture() {
        return '/textures/' + this.code() + '.png';
    }

    characters() {
        const code = 0xE000 + parseInt(this.code(), 16)
        return String.fromCharCode(code);
    }
}