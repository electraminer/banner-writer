import Color from "model/Color"
import { Action, ActionParams } from "./Action"
import Pattern from "model/Pattern";

type KeyConfig = {
    actions: {key: string, modifiers?: string[], action: Action, params?: Partial<ActionParams>}[];
    modifiers: {modifiers: string[], params: Partial<ActionParams>}[];
};
export default KeyConfig;

const MS = ["ShiftLeft"];
const MA = ["AltLeft"];
const SA = ["ShiftLeft", "AltLeft"];

export const DEFAULT_KEY_CONFIG = {
    actions: [
        {key: "KeyU", action: Action.SELECT_COLOR, params: {color: Color.WHITE}},
        {key: "KeyI", action: Action.SELECT_COLOR, params: {color: Color.ORANGE}},
        {key: "KeyO", action: Action.SELECT_COLOR, params: {color: Color.MAGENTA}},
        {key: "KeyP", action: Action.SELECT_COLOR, params: {color: Color.LIGHT_BLUE}},
        {key: "BracketLeft", action: Action.SELECT_COLOR, params: {color: Color.YELLOW}},
        {key: "BracketRight", action: Action.SELECT_COLOR, params: {color: Color.LIME}},
        {key: "KeyH", action: Action.SELECT_COLOR, params: {color: Color.PINK}},
        {key: "KeyJ", action: Action.SELECT_COLOR, params: {color: Color.GRAY}},
        {key: "KeyK", action: Action.SELECT_COLOR, params: {color: Color.LIGHT_GRAY}},
        {key: "KeyL", action: Action.SELECT_COLOR, params: {color: Color.CYAN}},
        {key: "Semicolon", action: Action.SELECT_COLOR, params: {color: Color.PURPLE}},
        {key: "KeyN", action: Action.SELECT_COLOR, params: {color: Color.BLUE}},
        {key: "KeyM", action: Action.SELECT_COLOR, params: {color: Color.BROWN}},
        {key: "Comma", action: Action.SELECT_COLOR, params: {color: Color.GREEN}},
        {key: "Period", action: Action.SELECT_COLOR, params: {color: Color.RED}},
        {key: "Slash", action: Action.SELECT_COLOR, params: {color: Color.BLACK}},

        {key: "Quote", action: Action.SWAP_COLORS},

        {key: "KeyW", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.SQUARE_BORDER}},
        {key: "KeyW", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.CURLY_BORDER}},

        {key: "KeyE", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.TOP_HALF}},
        {key: "KeyE", modifiers: MA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BOTTOM_HALF}},
        {key: "KeyE", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.LEFT_HALF}},
        {key: "KeyE", modifiers: SA, action: Action.INSERT_LAYER, params: {pattern: Pattern.RIGHT_HALF}},
        
        {key: "KeyR", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.TOP_STRIPE}},
        {key: "KeyR", modifiers: MA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BOTTOM_STRIPE}},
        {key: "KeyR", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.LEFT_STRIPE}},
        {key: "KeyR", modifiers: SA, action: Action.INSERT_LAYER, params: {pattern: Pattern.RIGHT_STRIPE}},
        
        {key: "KeyT", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.VERTICAL_STRIPE}},
        {key: "KeyT", modifiers: MA, action: Action.INSERT_LAYER, params: {pattern: Pattern.HORIZONTAL_STRIPE}},
        {key: "KeyT", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.FORWARD_SLASH}},
        {key: "KeyT", modifiers: SA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BACKWARD_SLASH}},
        
        {key: "KeyY", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.TOP_GRADIENT}},
        {key: "KeyY", modifiers: MA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BOTTOM_GRADIENT}},
        
        {key: "KeyA", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.TOP_ZIGZAG}},
        {key: "KeyA", modifiers: MA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BOTTOM_ZIGZAG}},
    
        {key: "KeyS", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.TOP_TRIANGLE}},
        {key: "KeyS", modifiers: MA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BOTTOM_TRIANGLE}},
        
        {key: "KeyD", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.ORTHOGONAL_CROSS}},
        {key: "KeyD", modifiers: MA, action: Action.INSERT_LAYER, params: {pattern: Pattern.DIAGONAL_CROSS}},
        {key: "KeyD", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.STRIPES}},
        
        {key: "KeyF", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.TOP_LEFT_CORNER}},
        {key: "KeyF", modifiers: MA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BOTTOM_LEFT_CORNER}},
        {key: "KeyF", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.TOP_RIGHT_CORNER}},
        {key: "KeyF", modifiers: SA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BOTTOM_RIGHT_CORNER}},
        
        {key: "KeyG", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.TOP_LEFT_HALF}},
        {key: "KeyG", modifiers: MA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BOTTOM_LEFT_HALF}},
        {key: "KeyG", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.TOP_RIGHT_HALF}},
        {key: "KeyG", modifiers: SA, action: Action.INSERT_LAYER, params: {pattern: Pattern.BOTTOM_RIGHT_HALF}},
        
        {key: "KeyZ", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.CREEPER_SYMBOL}},
        {key: "KeyZ", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.SKULL_SYMBOL}},
        
        {key: "KeyX", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.FLOWER_SYMBOL}},
        {key: "KeyX", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.GLOBE_SYMBOL}},
        
        {key: "KeyC", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.PIGLIN_SYMBOL}},
        {key: "KeyC", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.MOJANG_SYMBOL}},

        {key: "KeyV", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.CIRCLE}},
        {key: "KeyV", modifiers: MS, action: Action.INSERT_LAYER, params: {pattern: Pattern.DIAMOND}},
        
        {key: "KeyB", modifiers: [], action: Action.INSERT_LAYER, params: {pattern: Pattern.BRICKS}},

        {key: "Backspace", action: Action.REMOVE_LAYER},
        {key: "Minus", action: Action.SET_LAYER_COLOR},
        {key: "Equal", action: Action.SWAP_LAYER},

        {key: "Backspace", modifiers: ["ShiftLeft"], action: Action.CLEAR_BANNER},
        {key: "KeyQ", action: Action.ADD_CLEAR_BANNER},
        {key: "KeyQ", modifiers: ["ShiftLeft"], action: Action.ADD_BANNER},
        {key: "Space", action: Action.ADD_SPACE},
        {key: "Enter", action: Action.ADD_LINE},
        {key: "Delete", action: Action.BACKSPACE_SELECT},
        {key: "Delete", modifiers: ["ShiftLeft"], action: Action.BACKSPACE},

        {key: "Backslash", action: Action.TOGGLE_DIRECTION},
        {key: "Backspace", modifiers: ["AltLeft"], action: Action.CLEAR_WRITING},

        {key: "KeyC", modifiers: ["ControlLeft"], action: Action.COPY_IMAGE},
        {key: "KeyC", modifiers: ["ControlLeft", "ShiftLeft"], action: Action.COPY_ANVIL},
        {key: "KeyC", modifiers: ["ControlLeft", "AltLeft"], action: Action.COPY_UNICODE},
        
        {key: "KeyV", modifiers: ["ControlLeft"], action: Action.PASTE_CODE},
        {key: "KeyV", modifiers: ["ControlLeft", "AltLeft"], action: Action.PASTE_UNICODE},
    ],
    modifiers: [
        {modifiers: ["ShiftRight"], params: {isSecondary: true}},
        {modifiers: ["Digit1"], params: {layerOffset: 1}},
        {modifiers: ["Digit2"], params: {layerOffset: 2}},
        {modifiers: ["Digit3"], params: {layerOffset: 3}},
        {modifiers: ["Digit4"], params: {layerOffset: 4}},
        {modifiers: ["Digit5"], params: {layerOffset: 5}},
        {modifiers: ["Digit6"], params: {layerOffset: 6}},
        {modifiers: ["Backquote"], params: {layerIndex: 0}},
        {modifiers: ["Backquote", "Digit1"], params: {layerIndex: 1}},
        {modifiers: ["Backquote", "Digit2"], params: {layerIndex: 2}},
        {modifiers: ["Backquote", "Digit3"], params: {layerIndex: 3}},
        {modifiers: ["Backquote", "Digit4"], params: {layerIndex: 4}},
        {modifiers: ["Backquote", "Digit5"], params: {layerIndex: 5}},
        {modifiers: ["Backquote", "Digit6"], params: {layerIndex: 6}},
    ]
}

