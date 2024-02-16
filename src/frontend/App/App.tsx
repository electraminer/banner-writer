import "./App.css";
// Internal dependencies
import TitleBar from "./TitleBar/TitleBar";
import BannerEditor from "./BannerEditor/BannerEditor";
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

function App() {
    return (
        <ActionContextProvider>
        <KeyHandler config={DEFAULT_KEY_CONFIG}>
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
                        <ForceSize className="AppBannerEditorSection">
                            <div className="AppSection">
                                <ForceSize className="AppBannerEditor">
                                    <BannerEditor/>
                                </ForceSize>
                            </div>
                        </ForceSize>
                        <div className="AppSection AppHistorySection">
                            <ForceSize className="AppRecentBanners">
                                <RecentBanners/>
                            </ForceSize>
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
        </KeyHandler>
        </ActionContextProvider>
    );
}

export default App;
