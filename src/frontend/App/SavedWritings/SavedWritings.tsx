import "./SavedWritings.css"
// Internal dependencies
import WritingComponent from "./WritingComponent/WritingComponent";
import WritingContext from "../WritingContext";
import SavedContext from "../SavedContext";
import Text from "frontend/Text/Text";
import BannerComponent from "frontend/BannerComponent/BannerComponent";
import Button from "frontend/Button/Button";
import ForceSize from "frontend/ForceSize/ForceSize";
import Writing from "model/Writing"
import Banner from "model/Banner"
import Layer from "model/Layer"
import Color from "model/Color";
// External dependencies
import React from "react";

export default function SavedWritings() {
    const writingContext = React.useContext(WritingContext);
    const savedContext = React.useContext(SavedContext);

    const deleteBanner = new Banner(6,
        new Layer(3, 5),
        new Layer(6, 1));
    const addBanner = new Banner(8,
        new Layer(3, 28),
        new Layer(3, 34),
        new Layer(8, 1));
    const swapBanner = new Banner(8,
        new Layer(3, 29),
        new Layer(3, 36),
        new Layer(3, 30),
        new Layer(8, 6));

    const s = savedContext.selected;
    return (
        <div className="SavedWritings">
            <ForceSize className="SavedWritingsHeader">
                <div className="SavedWritingsHeaderArea">
                    <Text text="SAVED WRITINGS"/>
                    <Button
                        onLeftClick={() => savedContext.addWriting(0, writingContext.writing)}>
                        <BannerComponent banner={Banner.fromString("󏿷󏿷")[0]}/>
                    </Button>
                </div>
            </ForceSize>
            <div className="SavedWritingsScrollBox">
                {savedContext.saved.map((str, i) =>
                    <div className="SavedWritingsWriting" key={i}>
                        <div className="SavedWritingsText">
                            <WritingComponent writing={Writing.fromString(str)[0]} index={i}
                            setWriting={(w) => {
                                const toUpdateSelected = savedContext.updateWriting(i, w)
                                if (toUpdateSelected) {
                                    writingContext.setWriting(toUpdateSelected, false)
                                }
                            }}/>
                        </div>
                        <div className="SavedWritingsControls">
                            <Button className="SavedWritingsSelectButton"
                                onLeftClick={() => writingContext.setWriting(
                                    savedContext.select(i == s ? -1 : i) ?? writingContext.defaultWriting, false
                                )}>
                                <Text text={i == s ? "SAVE" : "EDIT"}
                                    backgroundColor={i == s ? Color.YELLOW : Color.LIGHT_BLUE}/>
                            </Button>
                            
                            {i == 0 ?
                                <div className="SavedWritingsBlankButton">
                                    <BannerComponent banner={Banner.fromString("")[0]}/>
                                </div>
                            :
                                <Button
                                    onLeftClick={() => savedContext.swap(i - 1)}>
                                    <BannerComponent banner={Banner.fromString("󏿷󏿷󏿷󏿷")[0]}/>
                                </Button>
                            }
                            {i == s ?
                                <Button
                                    onLeftClick={() => savedContext.removeSelected()}>
                                    <BannerComponent banner={Banner.fromString("󏿷󏿷")[0]}/>
                                </Button>
                            :
                                <Button
                                    onLeftClick={() => savedContext.addWriting(
                                        i + 1, writingContext.writing
                                    )}>
                                    <BannerComponent banner={Banner.fromString("󏿷󏿷")[0]}/>
                                </Button>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}