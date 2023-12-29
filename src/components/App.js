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
import Banner from 'model/Banner';

import React, { useEffect } from 'react';
import SavedContext from './context/SavedContext';
import html2canvas from 'html2canvas';

function App() {
    const screenshotRef = React.useRef(null);

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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const characters = urlParams.get('writing');

        if (!characters) {
            return;
        }
        writingContext.updateWriting(
            (w) => {
                w.banners = Writing.fromCharacters(characters, w.rightToLeft);
            })
    }, [])

    return (
        <div className='App'>
            <div className='AppHeader'>
                <BannerFontText text='￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷￷'/>
                <a href='https://banner-writer.web.app/about'>
                    <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                </a>
                <div className='AppHeaderSpacer'/>
                <button
                    onClick={() => {
                        let code = prompt('Insert /getbannercode code');
                        if (code) {
                            bannerContext.setBanner(Banner.fromBannerCode(code));
                        }
                    }}>
                    <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                </button>
                <button
                    onClick={() => writingContext.updateWriting(
                        (w) => w.backspace())}>
                    <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                </button>
                <button
                    onClick={async () => {
                        const canvas = await html2canvas(screenshotRef.current);
                        console.log(canvas);
                        const blob = await new Promise(resolve => canvas.toBlob(resolve));
                        if (navigator.clipboard.write == undefined) {
                            if (navigator.userAgent.toLowerCase().includes('firefox')) {
                                alert("To allow copying images to clipboard, you must change your Firefox settings.\n\
                                Here are some steps to fix this issue:\n\
                                1) Navigate to the url 'about:config'.\n\
                                2) Click 'Accept the Risk and Continue'.\n\
                                3) Type 'dom.events.asyncClipboard.clipboardItem' in the box.\n\
                                4) Click the button with the two-arrows symbol to the right.\n\
                                5) The value in the middle should now appear as 'true'.\n\
                                6) Return to banner-writer and reload the page.")
                            } else {
                                alert("Copying images to your clipboard is unsupported for an unknown reason.\n\
                                Contact Electra with information about your browser to get this fixed.")
                            }
                            
                        } else {
                            navigator.clipboard.write([new window.ClipboardItem(
                                { [blob.type]: blob }
                            )])
                        }
                    }}>
                    <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
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
                    <BannerFontText text='󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷󏿷'/>
                    <div className='AppAnvilDetails'>
                        <BannerFontText text=''/>
                        <BannerFontText text={createNumber(
                            Math.min(writingContext.writing.optimizedCharacters().length, 99)
                                .toString().padStart(2, '0'))}/>
                        <BannerFontText text='󏿷󏿷'/>
                        <BannerFontText text={createNumber('50')}/>
                    </div>
                </button>
            </div>
            <ForceSize className='AppWritingComponent'>
                <div className='AppScreenshotZone ForceSize' ref={screenshotRef}>
                    <WritingComponent/>
                </div>
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
