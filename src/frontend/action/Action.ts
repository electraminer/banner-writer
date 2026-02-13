import Color from "model/Color";
import Pattern from "model/Pattern";
import Banner from "model/Banner";
import Writing from "model/Writing";

export enum Action {

    SELECT_COLOR = "SELECT_COLOR",
    SWAP_COLORS = "SWAP_COLORS",

    INSERT_LAYER = "INSERT_LAYER",
    REMOVE_LAYER = "REMOVE_LAYER",
    SWAP_LAYER = "SWAP_LAYER",
    SET_LAYER_COLOR = "SET_LAYER_COLOR",

    SET_BANNER = "SET_BANNER",
    CLEAR_BANNER = "CLEAR_BANNER",

    ADD_WRITING = "ADD_WRITING",
    ADD_BANNER = "ADD_BANNER",
    ADD_SPACE = "ADD_SPACE",
    ADD_LINE = "ADD_LINE",
    BACKSPACE = "BACKSPACE",
    
    ADD_CLEAR_BANNER = "ADD_CLEAR_BANNER",
    BACKSPACE_SELECT = "BACKSPACE_SELECT",

    TOGGLE_DIRECTION = "TOGGLE_DIRECTION",
    CLEAR_WRITING = "CLEAR_WRITING",

    COPY_IMAGE_LINK = "COPY_IMAGE_LINK",
    COPY_IMAGE = "COPY_IMAGE",
    COPY_ANVIL = "COPY_ANVIL",
    COPY_UNICODE = "COPY_UNICODE",
    COPY_COMMAND = "COPY_COMMAND",

    PASTE_SMART = "PASTE_SMART",

    // Jank!
    UPDATE_OPTIMIZE_LEN = "UPDATE_OPTIMIZE_LEN",

    SET_CURSOR = "SET_CURSOR",

    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT",

    UNDO = "UNDO",
    REDO = "REDO",
}

export type ActionParams = {
    primary: Color,
    secondary: Color,
    isSecondary: boolean,
    color: Color,

    pattern: Pattern,
    layerOffset: number,
    layerIndex: number,

    banner: Banner,

    cursor: {} | {cursorLine: number, cursorPos: number} | {cursorLine: number, cursorPos: number, startCursorLine: number, startCursorPos: number},
    clearSelection: boolean,

    writing: Writing,

    writingId: number,
}