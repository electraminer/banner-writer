// Internal dependencies
import Writing, { CODEPOINT_WRITING_DIR_LTR, CODEPOINT_WRITING_DIR_RTL } from "model/Writing";
// External dependencies
import React from "react";
import { produce } from "immer";

const SavedContext = React.createContext(null);
export default SavedContext;

export function SavedContextProvider(props: {children: React.ReactNode}) {
    const [saved, setSaved] = React.useState(() =>
        JSON.parse(localStorage.saved || "[]").map(obj => {
            if (typeof obj == "object" && obj.rightToLeft != undefined) {
                const controlCodePoint = (obj.rightToLeft ? 
                    CODEPOINT_WRITING_DIR_RTL
                :
                    CODEPOINT_WRITING_DIR_LTR
                );
                return String.fromCodePoint(controlCodePoint) + obj.characters;
            } else {
                return obj as string;
            }
        }) as string[]
    );
    const [selected, setSelected] = React.useState(-1);

    const updateSaved = function(update: (saved: string[]) => void) {
        const newSaved = produce(saved, (saved: string[]) => {
            update(saved);
        });
        setSaved(newSaved);
        localStorage.saved = JSON.stringify(newSaved);
    }

    const updateSelected = function(writing: Writing) {
        if (selected != -1) {
            updateSaved((saved: string[]) => {
                saved[selected] = writing.toString();
            });
        }
    }

    const addWriting = function(index: number, writing: Writing) {
        updateSaved((saved: string[]) => {
            saved.splice(index, 0, writing.toString());
        });

        setSelected(index);
    }

    const updateWriting = function(index: number, writing: Writing): Writing | undefined {
        if (index >= 0 && index < saved.length) {
            updateSaved((saved: string[]) => {
                saved[index] = writing.toString();
            })
            if (selected == index) {
                return writing;
            }
        }
        return undefined;
    }

    const swap = function(index: number) {
        updateSaved((saved: string[]) => {
            const temp = saved[index];
            saved[index] = saved[index + 1];
            saved[index + 1] = temp;
        });

        if (selected == index) {
            setSelected(index + 1);
        } else if (selected == index + 1) {
            setSelected(index);
        }
    }

    const removeSelected = function() {
        updateSaved((saved: string[]) => {
            saved.splice(selected, 1);
        });

        setSelected(-1);
    }

    const select = function(index: number): Writing | undefined {
        setSelected(index);
        if (index < 0) {
            return undefined;
        }
        return Writing.fromString(saved[index])[0];
    }

    return (
        <SavedContext.Provider value={{
            saved: saved,
            selected: selected,
            select: select,
            updateSelected: updateSelected,
            addWriting: addWriting,
            swap: swap,
            removeSelected: removeSelected,
            updateWriting: updateWriting,
        }}>
            {props.children}
        </SavedContext.Provider>
    );
}