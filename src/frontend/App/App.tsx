import "./App.css";
// Internal dependencies
import TitleBar from "./TitleBar/TitleBar";
import BannerEditor, { BANNER_EDITOR_HEIGHT, BANNER_EDITOR_WIDTH } from "./BannerEditor/BannerEditor";
import RecentBanners from "./RecentBanners/RecentBanners";
import SavedWritings from "./SavedWritings/SavedWritings";
import WritingEditor from "./WritingEditor/WritingEditor";
import { WritingContextProvider } from "./WritingContext";
import { RecentContextProvider } from "./RecentContext";
import { SavedContextProvider } from "./SavedContext";
import ForceSize from "frontend/ForceSize/ForceSize";
// External dependencies
import React from "react";
import KeyHandler from "frontend/action/KeyboardInterface";
import { ActionContextProvider } from "frontend/action/ActionContext";
import { DEFAULT_KEY_CONFIG } from "frontend/action/KeyConfig";
import SettingsContext from "frontend/SettingsContext";
import { DragContextProvider } from "./DragContext";

function App() {
    const settingsContext = React.useContext(SettingsContext);

    const [resizing, setResizing] = React.useState(false);
    const [height, setHeight] = React.useState(null);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (resizing) {
            const onMouseMove = (e: MouseEvent) => {
                let height = e.clientY - ref.current.getBoundingClientRect().top;
                if (height > ref.current.getBoundingClientRect().height - 60) {
                    height = ref.current.getBoundingClientRect().height - 60;
                }
                setHeight(height);
            }
            const onMouseUp = (e: MouseEvent) => {
                setResizing(false);
            }
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
            return () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            }
        }
    }, [resizing, setResizing, setHeight])
    
    return (
        <ActionContextProvider>
        <KeyHandler config={settingsContext.keyConfig}>
        <DragContextProvider>
        <RecentContextProvider>
        <SavedContextProvider>
        <WritingContextProvider>
            <div className="App">
                <ForceSize className="AppTitleBar">
                    <TitleBar/>
                </ForceSize>
                <ForceSize className="AppWritingEditor">
                    <WritingEditor/>
                </ForceSize>
                <div className="AppBannerSelect">
                    <div className="AppBannerSelectScrollBox">
                        <ForceSize className="AppBannerEditorSection" aspectRatio={`${BANNER_EDITOR_WIDTH}/${2*BANNER_EDITOR_HEIGHT}`}>
                            <div className="AppSection">
                                <ForceSize className="AppBannerEditor" aspectRatio={`${BANNER_EDITOR_WIDTH}/${2*BANNER_EDITOR_HEIGHT}`}>
                                    <BannerEditor/>
                                </ForceSize>
                            </div>
                        </ForceSize>
                        <div className="AppSection AppHistorySection" ref={ref}>
                            <ForceSize className="AppRecentBanners" style={{
                                height: height!==null ? `${height}px` : undefined,
                                flex: height!==null ? "0 0 auto" : undefined,
                                minHeight: "60px",
                            }}>
                                <RecentBanners/>
                            </ForceSize>
                            <button className="AppHistorySection_ResizeBar"
                                onMouseDown={() => setResizing(true)}
                            >
                            </button>
                            <ForceSize className="AppSavedWritings">
                                <SavedWritings/>
                            </ForceSize>
                        </div>
                    </div>
                </div>
            </div>
        </WritingContextProvider>
        </SavedContextProvider>
        </RecentContextProvider>
        </DragContextProvider>
        </KeyHandler>
        </ActionContextProvider>
    );
}

export default App;
