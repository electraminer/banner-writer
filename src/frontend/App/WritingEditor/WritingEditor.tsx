import "./WritingEditor.css"
// Internal dependencies
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import ActionContext from "frontend/action/ActionContext";
import { Action, ActionParams } from "frontend/action/Action";
// External dependencies
import React from "react";
import DragContext from "../DragContext";
import { produce } from "immer";
import RecentContext from "../RecentContext";
import SavedContext from "../SavedContext";
import Writing from "model/Writing";
import { clear } from "console";

export default function WritingEditor() {
    const recentContext = React.useContext(RecentContext);
    const actionContext = React.useContext(ActionContext);
    const savedContext = React.useContext(SavedContext);
    const dragContext = React.useContext(DragContext);

    const [defaultRightToLeft, setDefaultRightToLeft] = React.useState(
        localStorage.defaultRightToLeft === "true");

    const setDefaultRightToLeftSaved = function(defaultRightToLeft: boolean) {
        setDefaultRightToLeft(defaultRightToLeft);
        localStorage.defaultRightToLeft = defaultRightToLeft;
    }

    const defaultWriting = new Writing(defaultRightToLeft, []);

    const [writing, setWriting] = React.useState(defaultWriting);

    const [undoStack, setUndoStack] = React.useState<[Writing, number, number, number, number][]>([]);
    const [redoStack, setRedoStack] = React.useState<[Writing, number, number, number, number][]>([]);

    // Actual cursor position
    const [cursorLine, setCursorLine] = React.useState(0);
    const [cursorPos, setCursorPos] = React.useState(0);
    // Start-of-selection cursor position
    const [startCursorLine, setStartCursorLine] = React.useState(0);
    const [startCursorPos, setStartCursorPos] = React.useState(0);

    const cursorProvider = actionContext.useProvider(React.useRef(), "cursor");
    const writingProvider = actionContext.useProvider(React.useRef(), "writing");

    const setCursorHandler = actionContext.useHandler(React.useRef(), Action.SET_CURSOR);
    const upHandler = actionContext.useHandler(React.useRef(), Action.UP);
    const downHandler = actionContext.useHandler(React.useRef(), Action.DOWN);
    const leftHandler = actionContext.useHandler(React.useRef(), Action.LEFT);
    const rightHandler = actionContext.useHandler(React.useRef(), Action.RIGHT);

    const addWritingHandler = actionContext.useHandler(React.useRef(), Action.ADD_WRITING);
    const undoHandler = actionContext.useHandler(React.useRef(), Action.UNDO);
    const redoHandler = actionContext.useHandler(React.useRef(), Action.REDO);
    const toggleDirectionHandler = actionContext.useHandler(React.useRef(), Action.TOGGLE_DIRECTION);
    const addBannerHandler = actionContext.useHandler(React.useRef(), Action.ADD_BANNER);
    const addSpaceHandler = actionContext.useHandler(React.useRef(), Action.ADD_SPACE);
    const addLineHandler = actionContext.useHandler(React.useRef(), Action.ADD_LINE);
    const addClearBannerHandler = actionContext.useHandler(React.useRef(), Action.ADD_CLEAR_BANNER);
    const backspaceHandler = actionContext.useHandler(React.useRef(), Action.BACKSPACE);
    const backspaceSelectHandler = actionContext.useHandler(React.useRef(), Action.BACKSPACE_SELECT);

    React.useEffect(() => {

        cursorProvider(resolver => {
            if (cursorLine === startCursorLine && cursorPos === startCursorPos) {
                return {cursorLine, cursorPos}
            } else {
                return {cursorLine, cursorPos, startCursorLine, startCursorPos}
            }
        })

        // Fix the cursor position to be valid
        function fixCursor(line, pos): [number, number] {
            // Fix cursor 
            if (line < 0) {
                line = 0;
            }
            if (line >= writing.lines.length) {
                line = writing.lines.length - 1;
            }
            if (pos < 0) {
                pos = 0;
            }
            if (pos > writing.lines[line].length) {
                pos = writing.lines[line].length;
            }

            return [line, pos];
        }

        function normalizeCursor(cursor: ActionParams["cursor"]): [number, number, number, number] {
            if (!("cursorLine" in cursor)) {
                return [0, 0, writing.lines.length - 1, writing.lines[writing.lines.length - 1].length];
            }

            const [ecl, ecp] = fixCursor(cursor.cursorLine, cursor.cursorPos);
            if (!("startCursorLine" in cursor)) {
                return [ecl, ecp, ecl, ecp];
            }

            const [scl, scp] = fixCursor(cursor.startCursorLine, cursor.startCursorPos);
            if (ecl < scl || ecl === scl && ecp < scp) {
                return [ecl, ecp, scl, scp];
            } else {
                return [scl, scp, ecl, ecp];
            }
        }

        writingProvider(resolver => {
            const cursor = resolver("cursor");
            const [scl, scp, ecl, ecp] = normalizeCursor(cursor);

            const selection = new Writing(writing.rightToLeft, []);

            if (scl === ecl) {
                for (let j = scp; j < ecp; j++) {
                    selection.lines[selection.lines.length - 1].push(writing.lines[scl][j]);
                }
            } else {
                for (let j = scp; j < writing.lines[scl].length; j++) {
                    selection.lines[selection.lines.length - 1].push(writing.lines[scl][j]);
                }
                for (let i = scl + 1; i < ecl; i++) {
                    selection.lines.push(writing.lines[i]);
                }
                selection.lines.push([]);
                for (let j = 0; j < ecp; j++) {
                    selection.lines[selection.lines.length - 1].push(writing.lines[ecl][j]);
                }

            }

            return selection;
        })

        setCursorHandler((params, invoke) => {
            const [scl, scp, ecl, ecp] = normalizeCursor(params.cursor);

            setStartCursorLine(scl);
            setStartCursorPos(scp);
            setCursorLine(ecl);
            setCursorPos(ecp);
        })

        function moveCursor(cursor: ActionParams["cursor"], x: number, y: number, wrap: boolean, clearSelection: boolean) {
            let [scl, scp, ecl, ecp] = normalizeCursor(cursor);

            ecl += y;
            ecp += x;

            if (wrap) {
                if (ecl > 0 && ecp < 0) {
                    ecl -= 1;
                    ecp = writing.lines[ecl].length;
                }
                if (ecl < writing.lines.length - 1 && ecp > writing.lines[ecl].length) {
                    ecl += 1;
                    ecp = 0;
                }
            }

            if (clearSelection) {
                scl = ecl;
                scp = ecp;
            }

            return [scl, scp, ecl, ecp];
        }
        

        upHandler((params, invoke) => {
            const [scl, scp, ecl, ecp] = moveCursor(params.cursor, 0, -1, false, params.clearSelection !== false);
            invoke(Action.SET_CURSOR, {cursor: {startCursorLine: scl, startCursorPos: scp, cursorLine: ecl, cursorPos: ecp}});
        });
        downHandler((params, invoke) => {
            const [scl, scp, ecl, ecp] = moveCursor(params.cursor, 0, 1, false, params.clearSelection !== false);
            invoke(Action.SET_CURSOR, {cursor: {startCursorLine: scl, startCursorPos: scp, cursorLine: ecl, cursorPos: ecp}});
        });
        leftHandler((params, invoke) => {
            const [scl, scp, ecl, ecp] = moveCursor(params.cursor, -(writing.rightToLeft ? -1 : 1), 0, true, params.clearSelection !== false);
            invoke(Action.SET_CURSOR, {cursor: {startCursorLine: scl, startCursorPos: scp, cursorLine: ecl, cursorPos: ecp}});
        });
        rightHandler((params, invoke) => {
            const [scl, scp, ecl, ecp] = moveCursor(params.cursor, (writing.rightToLeft ? -1 : 1), 0, true, params.clearSelection !== false);
            invoke(Action.SET_CURSOR, {cursor: {startCursorLine: scl, startCursorPos: scp, cursorLine: ecl, cursorPos: ecp}});
        });

        addWritingHandler((params, invoke) => {
            const [scl, scp, ecl, ecp] = normalizeCursor(params.cursor);

            let toWrite = params.writing ?? new Writing(writing.rightToLeft, []);

            const newWriting = new Writing(writing.rightToLeft);
            // Add everything before the selection
            for (let i = 0; i < scl; i++) {
                newWriting.lines.push(writing.lines[i]);
            }
            newWriting.lines.push([]);
            for (let j = 0; j < scp; j++) {
                newWriting.lines[newWriting.lines.length - 1].push(writing.lines[scl][j]);
            }
            // Add the new writing
            for (let j = 0; j < toWrite.lines[0].length; j++) {
                newWriting.lines[newWriting.lines.length - 1].push(toWrite.lines[0][j]);
            }
            for (let i = 1; i < toWrite.lines.length; i++) {
                newWriting.lines.push(toWrite.lines[i]);
            }
            // Insert the new cursor after the new writing
            let newCursorLine = newWriting.lines.length - 1;
            let newCursorPos = newWriting.lines[newCursorLine].length;

            // Add everything after the selection
            for (let j = ecp; j < writing.lines[ecl].length; j++) {
                newWriting.lines[newWriting.lines.length - 1].push(writing.lines[ecl][j]);
            }
            for (let i = ecl + 1; i < writing.lines.length; i++) {
                newWriting.lines.push(writing.lines[i]);
            }

            // Save the previous position to the undo stack
            setUndoStack(produce(undoStack => undoStack.push([writing, cursorLine, cursorPos, startCursorLine, startCursorPos])));
            setRedoStack([]);
            // Update the writing
            setWriting(newWriting);
            setCursorLine(newCursorLine);
            setCursorPos(newCursorPos);
            setStartCursorLine(newCursorLine);
            setStartCursorPos(newCursorPos);
        })

        undoHandler((params, invoke) => {
            if (undoStack.length === 0) {
                return;
            }

            const loadedState = undoStack[undoStack.length - 1]
            // Save the previous position to the redo stack
            setUndoStack(produce(undoStack => undoStack.pop()));
            setRedoStack(produce(redoStack => redoStack.push([writing, cursorLine, cursorPos, startCursorLine, startCursorPos])));
            // Update the writing
            setWriting(loadedState[0]);
            setCursorLine(loadedState[1]);
            setCursorPos(loadedState[2]);
            setStartCursorLine(loadedState[3]);
            setStartCursorPos(loadedState[4]);
        });

        redoHandler((params, invoke) => {
            if (undoStack.length === 0) {
                return;
            }

            const loadedState = undoStack[undoStack.length - 1]
            // Save the previous position to the undo stack
            setUndoStack(produce(undoStack => undoStack.push([writing, cursorLine, cursorPos, startCursorLine, startCursorPos])));
            setRedoStack(produce(redoStack => redoStack.pop()));
            // Update the writing
            setWriting(loadedState[0]);
            setCursorLine(loadedState[1]);
            setCursorPos(loadedState[2]);
            setStartCursorLine(loadedState[3]);
            setStartCursorPos(loadedState[4]);
        });
        
        addBannerHandler((params, invoke) => invoke(Action.ADD_WRITING, {writing: new Writing(false, [params.banner])}));
        addClearBannerHandler((params, invoke) => invoke(Action.ADD_WRITING, {writing: new Writing(false, [params.banner])}));
        addSpaceHandler((params, invoke) => invoke(Action.ADD_WRITING, {writing: new Writing(false, [undefined])}));
        addLineHandler((params, invoke) => invoke(Action.ADD_WRITING, {writing: new Writing(false, [], [])}));
        
        function backspace(params, invoke, setDeletedBanner: boolean) {
            let [scl, scp, ecl, ecp] = normalizeCursor(params.cursor);
            if (scl === scp && ecl === ecp) {
                [scl, scp, ecl, ecp] = moveCursor(params.cursor, -1, 0, true, false);
                if (writing.lines[scl][scp] && setDeletedBanner) {
                    invoke(Action.SET_BANNER, {banner: writing.lines[scl][scp]})
                }   
            }
            invoke(Action.ADD_WRITING, {writing: new Writing(false, []), cursor: {startCursorLine: scl, startCursorPos: scp, cursorLine: ecl, cursorPos: ecp}});
        }

        backspaceHandler((params, invoke) => backspace(params, invoke, false));
        backspaceSelectHandler((params, invoke) => backspace(params, invoke, true));

        toggleDirectionHandler((params, invoke) => {
            const newRightToLeft = !writing.rightToLeft;
            setDefaultRightToLeftSaved(newRightToLeft);
            const newWriting = produce(writing => writing.rightToLeft = newRightToLeft)(writing);

            invoke(Action.ADD_WRITING, {writing: newWriting, cursor: {}});
        });

    }, [defaultRightToLeft, defaultWriting, writing, cursorLine, cursorPos, startCursorLine, startCursorPos, undoStack, redoStack]);
    
    const dir = writing.rightToLeft ? "RightToLeft" : "LeftToRight";
    let size = writing.lines.length;
    let increased = true;
    while (increased) {
        increased = false;
        for (let line of writing.lines) {
            if (line.length >= 16 * size) {
                size += 1;
                increased = true;
                break;
            }
        }
    }
    if (size > 4) {
        size = 4;
    }

    function dragInBanner(line: number, cursor: number) {
        // if (dragContext.draggedBanner) {
        //     setWriting(produce(writing, writing => {
        //         if (dragContext.index === savedContext.selected) {
        //             writing.lines[dragContext.line].splice(dragContext.cursor, 1);
        //             if (line == dragContext.line && cursor > dragContext.cursor) {
        //                 cursor--;
        //             }
        //         }
        //         writing.lines[line].splice(cursor, 0, dragContext.draggedBanner);
        //     }));
        //     recentContext.addBanner(dragContext.draggedBanner);
        // }
    }

    let startCursor = startCursorLine * 1000000 + startCursorPos;
    let cursor = cursorLine * 1000000 + cursorPos;
    if (startCursor > cursor) {
        const temp = cursor;
        cursor = startCursor;
        startCursor = temp;
    }

    return (
        <div className={`WritingEditor WritingEditorDirection_${dir} WritingEditorSize_${size}`}>
            {writing.lines.map((line, i) =>
                <>
                    {line.map((banner, j) =>
                        <>
                            {cursor[0] == i && cursor[1] == j &&
                                <div className="WritingEditorCursor"/>              
                            }
                            <Button className={"WritingEditorBanner" + (
                                (startCursor <= i * 1000000 + j && i * 1000000 + j < cursor)
                                ? " WritingEditorSelected" : ""   
                            )}
                                onLeftClick={(isRight) => {
                                    const isForward = isRight != writing.rightToLeft;
                                    actionContext.invoke(Action.SET_CURSOR, {cursor: {cursorLine: i, cursorPos: j + (isForward ? 1 : 0)}});
                                }}
                                onRightClick={() => actionContext.invoke(Action.SET_BANNER, {banner: banner})}
                                onBeginDrag={() => {
                                    if (banner) {
                                        dragContext.setDraggedBanner(banner, savedContext.selected, i, j);
                                    }
                                }}
                                onEndDrag={(isRight) => {
                                    const isForward = isRight != writing.rightToLeft;
                                    dragInBanner(i, j + (isForward ? 1 : 0));
                                }}>
                                {banner ?
                                    <BannerComponent banner={banner} disableAA={true} key={j}></BannerComponent>
                                :
                                    <div className='BannerComponent'>&nbsp;</div>
                                }
                            </Button>
                        </>
                    )}
                    {cursor[0] == i && cursor[1] == line.length &&
                        <div className="WritingEditorCursor"/>   
                    }
                    <Button className="WritingEditorCursorEndHitbox"
                        onLeftClick={() => actionContext.invoke(Action.SET_CURSOR, {cursor: {cursorLine: i, cursorPos: line.length}})}
                        onEndDrag={() => {
                            dragInBanner(i, line.length);
                        }}>
                        <div/>
                    </Button>
                    <div className="WritingEditorNewline"/>
                </>
            )}
        </div>
    )
}

