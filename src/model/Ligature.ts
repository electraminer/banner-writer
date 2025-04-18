// External dependencies
import {immerable} from "immer";
import Writing from "./Writing";

/**
 * A block of Writing consisting of many lines of Banners with spaces.
 */
export default class Ligature {
    [immerable] = true;

    pattern: Writing;
    replace: Writing;

    /** Creates a new Ligature. */
    constructor(pattern: Writing, replace: Writing) {
        this.pattern = pattern;
        this.replace = replace;
    }
}