// Internal dependencies
import RecentContext from "./RecentContext";
import SavedContext from "./SavedContext";
import Writing from "model/Writing";
import Banner from "model/Banner";
// External dependencies
import React from "react";
import { produce } from "immer";

const WritingContext = React.createContext(null);
export default WritingContext;

export function WritingContextProvider(props: {children: React.ReactNode}) {
    const recentContext = React.useContext(RecentContext);
    const savedContext = React.useContext(SavedContext);

    const [writing, setWriting] = React.useState(new Writing(false, []));
    const [cursorLine, setCursorLine] = React.useState(0);
    const [cursorPos, setCursorPos] = React.useState(0);

    const setCursor = function(cursorLine: number, cursorPos: number) {
        setCursorLine(cursorLine);
        setCursorPos(cursorPos);
    }

    const setWritingAndCursor = function(writing: Writing) {
        setWriting(writing);

        setCursor(writing.lines.length - 1, writing.lines[writing.lines.length - 1].length);
    }

    const updateWriting = function(update: (writing: Writing) => void) {
        const newWriting = produce(writing, update);
        setWriting(newWriting);

        savedContext.updateSelected(newWriting);
    }

    const addBanner = function(banner: Banner) { 
        updateWriting((writing: Writing) => {
            writing.lines[cursorLine].splice(cursorPos, 0, banner);
        });
        console.log("addbanner");
        setCursor(cursorLine, cursorPos + 1);

        recentContext.addBanner(banner);
    }

    const addSpace = function() { 
        updateWriting((writing: Writing) => {
            writing.lines[cursorLine].splice(cursorPos, 0, undefined);
        });
        setCursor(cursorLine, cursorPos + 1);
    }

    const addLine = function() {
        updateWriting((writing: Writing) => {
            const newLine = writing.lines[cursorLine].slice(cursorPos);
            writing.lines[cursorLine] = writing.lines[cursorLine].slice(0, cursorPos);
            writing.lines.splice(cursorLine + 1, 0, newLine);
        });
        setCursor(cursorLine + 1, 0);
    }

    const backspace = function() {
        if (cursorPos == 0) {
            if (cursorLine == 0) {
                return;
            }
            const newCursorPos = writing.lines[cursorLine - 1].length;
            updateWriting((writing: Writing) => {
                const [line] = writing.lines.splice(cursorLine, 1);
                writing.lines.splice(cursorLine, 0);
                writing.lines[cursorLine - 1].splice(newCursorPos, 0, ...line);
            });
            setCursor(cursorLine - 1, newCursorPos);
        } else {
            updateWriting((writing: Writing) => {
                writing.lines[cursorLine].splice(cursorPos - 1, 1);
            });
            setCursor(cursorLine, cursorPos - 1);
        }
    }

    return (
        <WritingContext.Provider value={{
            cursor: [cursorLine, cursorPos],
            writing: writing,
            setCursor: setCursor,
            setWriting: setWritingAndCursor,
            updateWriting: updateWriting,
            addBanner: addBanner,
            addSpace: addSpace,
            addLine: addLine,
            backspace: backspace,
        }}>
            {props.children}
        </WritingContext.Provider>
    )
}