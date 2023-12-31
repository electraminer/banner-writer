import "./App.css";
// Internal dependencies
import WritingComponent from "../WritingComponent/WritingComponent";
import BannerEditor from "frontend/App/BannerEditor/BannerEditor";
import ForceSize from "../ForceSize/ForceSize";
import Writing from "../../model/Writing";
// External dependencies
import React from "react";
import { BannerContextProvider } from "./BannerContext";

function App() {
    return (
        <BannerContextProvider>
            <div className="App">
                <div className="AppHeader">
                    <div/>
                </div>
                <ForceSize className="AppWritingEditor">
                    <div/>
                </ForceSize>
                <div className="AppBannerSelect">
                    <ForceSize className="AppBannerEditor">
                        <BannerEditor/>
                    </ForceSize>
                    <div className="AppHistorySection">
                        <div className="AppHeader">
                            <WritingComponent writing={
                                Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷")[0]
                            }/>
                        </div>
                        <ForceSize className="AppRecentBanners">
                            <div/>
                        </ForceSize>
                        <div className="AppHeader">
                            <WritingComponent writing={
                                Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷 󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷")[0]
                            }/>
                            <div className="AppHeaderSpacer"/>
                            {/* <button onClick={() => savedContext.addWriting(0,
                                writingContext.writing.rightToLeft, writingContext.writing.characters())}>
                                <BannerFontText text="󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷"/>
                            </button> */}
                        </div>
                        <ForceSize className="AppSavedWritings">
                            <div/>
                        </ForceSize>
                    </div>
                </div>
            </div>
        </BannerContextProvider>
    );
}

export default App;
