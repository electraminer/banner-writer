import "./App.css";
// Internal dependencies
import BannerEditor from "frontend/App/BannerEditor/BannerEditor";
import ForceSize from "../ForceSize/ForceSize";
import Writing from "../../model/Writing";
// External dependencies
import React from "react";
import { BannerContextProvider } from "./BannerContext";
import RecentBanners from "./RecentBanners/RecentBanners";
import { RecentContextProvider } from "./RecentContext";
import { SavedContextProvider } from "./SavedContext";
import { WritingContextProvider } from "./WritingContext";
import WritingEditor from "./WritingEditor/WritingEditor";
import TitleBar from "./TitleBar/TitleBar";

function App() {
    return (
        <BannerContextProvider>
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
                    <ForceSize className="AppBannerEditorSection">
                        <div className="AppSection">
                            <ForceSize className="AppBannerEditor">
                                <BannerEditor/>
                            </ForceSize>
                        </div>
                    </ForceSize>
                    <div className="AppSection">
                        <ForceSize className="AppRecentBanners">
                            <RecentBanners/>
                        </ForceSize>
                        <ForceSize className="AppSavedWritings">
                            <div/>
                        </ForceSize>
                    </div>
                </div>
            </div>
        </WritingContextProvider>
        </SavedContextProvider>
        </RecentContextProvider>
        </BannerContextProvider>
    );
}

export default App;
