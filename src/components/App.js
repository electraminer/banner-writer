import './App.css';

import BannerButton from 'components/BannerButton/BannerButton';
import BannerEditor from 'components/BannerEditor/BannerEditor';
import RecentBanners from 'components/RecentBanners/RecentBanners';
import BannerContext from './context/BannerContext';
import WritingContext from './context/WritingContext';
import RecentContext from './context/RecentContext';
import WritingComponent from 'components/WritingComponent/WritingComponent';
import BannerFontText from 'components/BannerFontText/BannerFontText';
import SavedWritings from 'components/SavedWritings/SavedWritings';
import Writing from 'model/Writing';

import React from 'react';
import SavedContext from './context/SavedContext';

function App() {
    const bannerContext = React.useContext(BannerContext);
    const writingContext = React.useContext(WritingContext);
    const recentContext = React.useContext(RecentContext);
    const savedContext = React.useContext(SavedContext);
    return (
        <div className='App'>
            <div className='AppHeader'>
                <BannerFontText text='￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷'/>
                <a href='https://banner-writer.web.app/about'>
                    <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                </a>
                <div className='AppHeaderSpacer'/>
                <button
                    onClick={() => writingContext.updateWriting(
                        (w) => w.backspace())}>
                    <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                </button>
                <button
                    onClick={() => writingContext.updateWriting(
                        (w) => {w.rightToLeft = !w.rightToLeft})}>
                    {writingContext.writing.rightToLeft ?
                        <BannerFontText text='￷￷￷￷￷￷￷￷￷￷￷￷￷'/>
                    :
                        <BannerFontText text='￷￷￷￷￷￷￷￷￷￷￷￷￷'/>
                    }
                </button>
                <button
                    onClick={() => navigator.clipboard.writeText(writingContext.writing.characters())}>
                    <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                </button>
                <button
                    onClick={() => writingContext.updateWriting(
                        (w) => {
                            const characters = prompt('Insert banner-font writing');
                            if (characters) {
                                w.banners = Writing.fromCharacters(characters, w.rightToLeft);
                            }
                        })}>
                    <BannerFontText text='￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷'/>
                </button>
            </div>
            <div className='AppWritingComponent ForceSize'>
                <WritingComponent/>
            </div>
            <div className='AppBannerSelect'>
                <div className='AppBannerEditor ForceSize'>
                    <BannerEditor banner={bannerContext.banner}
                        onBannerUpdate={bannerContext.updateBanner}/>
                </div>
                <div className='AppBannerDisplay ForceSize'>
                    <BannerButton banner={bannerContext.banner}
                        onLeftClick={() => writingContext.addBanner(bannerContext.banner)}
                        onRightClick={() => writingContext.updateWriting(
                            (w) => w.backspace())}/>
                </div>
                <div className='AppHistorySection'>
                    <div className='AppHeader'>
                        <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                    </div>
                    <div className='AppRecentBanners ForceSize'>
                        <RecentBanners/>
                    </div>
                    <div className='AppHeader'>
                        <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                        <div className='AppHeaderSpacer'/>
                        <button onClick={() => savedContext.addWriting(0,
                            writingContext.writing.rightToLeft, writingContext.writing.characters())}>
                            <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                        </button>
                    </div>
                    <div className='AppSavedWritings ForceSize'>
                        <SavedWritings/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
