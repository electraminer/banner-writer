import Color from "model/Color";
import Pattern from "model/Pattern";
import Banner from "model/Banner";

export enum Action {
    SELECT_COLOR = "SELECT_COLOR",
    SWAP_COLORS = "SWAP_COLORS",

    INSERT_LAYER = "INSERT_LAYER",
    REMOVE_LAYER = "REMOVE_LAYER",
    SWAP_LAYER = "SWAP_LAYER",
    SET_LAYER_COLOR = "SET_LAYER_COLOR",

    SET_BANNER = "SET_BANNER",
    CLEAR_BANNER = "CLEAR_BANNER",

    ADD_BANNER = "ADD_BANNER",
    ADD_SPACE = "ADD_SPACE",
    ADD_LINE = "ADD_LINE",
    BACKSPACE = "BACKSPACE",
    
    ADD_CLEAR_BANNER = "ADD_CLEAR_BANNER",
    BACKSPACE_SELECT = "BACKSPACE_SELECT",
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
}