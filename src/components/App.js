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
import ForceSize from 'components/ForceSize/ForceSize';
import Writing from 'model/Writing';

import React from 'react';
import SavedContext from './context/SavedContext';

function App() {
    const bannerContext = React.useContext(BannerContext);
    const writingContext = React.useContext(WritingContext);
    const recentContext = React.useContext(RecentContext);
    const savedContext = React.useContext(SavedContext);
    const anvilNumbers = [
        '󏿷󏿷󏿷󏿷󏿷󏿷',
        '󏿷󏿷󏿷󏿷',
        '󏿷󏿷󏿷󏿷󏿷',
        '󏿷󏿷󏿷󏿷󏿷󏿷',
        '󏿷󏿷󏿷󏿷󏿷',
        '󏿷󏿷󏿷󏿷󏿷',
        '󏿷󏿷󏿷󏿷󏿷󏿷',
        '󏿷󏿷󏿷',
        '󏿷󏿷󏿷󏿷󏿷󏿷',
        '󏿷󏿷󏿷󏿷󏿷󏿷',
    ];
    const createNumber = function(string) {
        let characters = '';
        for (const char of string) {
            characters += anvilNumbers[char.charCodeAt(0) - 0x30];
        }
        return characters;
    }
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
                <button
                    onClick={() => navigator.clipboard.writeText(writingContext.writing.optimizedCharacters())}>
                    <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                    <BannerFontText text={createNumber(
                        Math.min(writingContext.writing.optimizedCharacters().length, 99)
                            .toString().padStart(2, '0'))}/>
                    <BannerFontText text='󏿷󏿷'/>
                    <BannerFontText text={createNumber('50')}/>
                </button>
            </div>
            <ForceSize className='AppWritingComponent'>
                <WritingComponent/>
            </ForceSize>
            <div className='AppBannerSelect'>
                <ForceSize className='AppFullBannerEditor'>
                    <div className='AppFBEFlexbox'>
                        <ForceSize className='AppBannerEditor'>
                            <BannerEditor banner={bannerContext.banner}
                                onBannerUpdate={bannerContext.updateBanner}/>
                        </ForceSize>
                        <ForceSize className='AppBannerDisplay'>
                            <BannerButton banner={bannerContext.banner}
                                    onLeftClick={() => writingContext.addBanner(bannerContext.banner)}
                                    onRightClick={() => writingContext.updateWriting(
                                        (w) => w.backspace())}/>
                        </ForceSize>
                    </div>
                </ForceSize>
                <div className='AppHistorySection'>
                    <div className='AppHeader'>
                        <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                    </div>
                    <ForceSize className='AppRecentBanners'>
                        <RecentBanners/>
                    </ForceSize>
                    <div className='AppHeader'>
                        <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                        <div className='AppHeaderSpacer'/>
                        <button onClick={() => savedContext.addWriting(0,
                            writingContext.writing.rightToLeft, writingContext.writing.characters())}>
                            <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                        </button>
                    </div>
                    <ForceSize className='AppSavedWritings'>
                        <SavedWritings/>
                    </ForceSize>
                </div>
            </div>
        </div>
    );
}

export default App;
