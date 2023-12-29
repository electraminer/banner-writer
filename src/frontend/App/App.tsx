import "./App.css";
// Internal dependencies
import BannerButton from "../Button/Button";
import BannerFontText from "../Text/BannerFontText";
import ForceSize from "../ForceSize/ForceSize";
import Writing from "../../model/Writing";
// External dependencies
import React from "react";

function App() {
    // const bannerContext = React.useContext(BannerContext);
    // const writingContext = React.useContext(WritingContext);
    // const recentContext = React.useContext(RecentContext);
    // const savedContext = React.useContext(SavedContext);

    return (
        <div className="App">
            <div className="AppHeader">
                <div/>
            </div>
            <ForceSize className="AppWritingComponent">
                <div/>
            </ForceSize>
            <div className="AppBannerSelect">
                <ForceSize className="AppFullBannerEditor">
                    <div/>
                </ForceSize>
                <div className="AppHistorySection">
                    <div className="AppHeader">
                        <BannerFontText writing={
                            Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷")[0]
                        }/>
                    </div>
                    <ForceSize className="AppRecentBanners">
                        <div/>
                    </ForceSize>
                    <div className="AppHeader">
                        <BannerFontText writing={
                            Writing.fromString("󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷")[0]
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
    );
}

export default App;
