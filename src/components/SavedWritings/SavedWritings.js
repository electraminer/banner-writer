import "./SavedWritings.css"

import BannerButton from "components/BannerButton/BannerButton"
import WritingContext from "components/context/WritingContext"
import BannerFontText from "components/BannerFontText/BannerFontText"
import BannerContext from "components/context/BannerContext"
import SavedContext from "components/context/SavedContext"
import Writing from "model/Writing"
import Banner from "model/Banner"
import Layer from "model/Layer"

import React from "react";

export default function SavedWritings() {
    const writingContext = React.useContext(WritingContext);
    const bannerContext = React.useContext(BannerContext);
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
    
    return (
        <div className='SavedWritings'>
            {savedContext.saved.map((text, i) =>
                <div className='SavedWritingsWriting' key={i}>
                    <div className={'SavedWritingsText SWDirection_' + 
                        (text.rightToLeft ? 'RightToLeft' : 'LeftToRight')}>
                        {(text.rightToLeft ?
                            Writing.fromCharacters(text.characters).slice().reverse()
                        :
                            Writing.fromCharacters(text.characters)
                        ).map((banner, j) =>
                            <BannerButton banner={banner} key={j}
                                onLeftClick={() => writingContext.addBanner(banner)}
                                onRightClick={() => bannerContext.setBanner(banner)}/>
                        )}
                    </div>
                    { savedContext.selected == i ?
                        <div className='SavedWritingsControls'>
                            <button onClick={() =>
                                writingContext.setWriting(savedContext.select(-1))}>
                                <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                            </button>
                            <BannerButton banner={i == 0 ? new Banner(2) : swapBanner}
                                onLeftClick={() => i != 0 && savedContext.swap(i-1)}/>
                            <BannerButton banner={deleteBanner}
                                onLeftClick={() => savedContext.removeSelected()}/>
                        </div>
                    :
                        <div className='SavedWritingsControls'>
                            <button onClick={() => 
                                writingContext.setWriting(savedContext.select(i))}>
                                <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                            </button>
                            <BannerButton banner={i == 0 ? new Banner(2) : swapBanner}
                                onLeftClick={() => i != 0 && savedContext.swap(i-1)}/>
                            <BannerButton banner={addBanner}
                                onLeftClick={() => savedContext.addWriting(i+1,
                                    writingContext.writing.rightToLeft, writingContext.writing.characters())}/>
                        </div>
                    }
                </div>
            )}
        </div>
    );
}