import './WritingComponent.css'

import BannerContext from 'components/context/BannerContext';
import WritingContext from 'components/context/WritingContext';
import BannerButton from 'components/BannerButton/BannerButton';

import React from 'react';

export default function LayerStack({index}) {
    const writingContext = React.useContext(WritingContext);
    const bannerContext = React.useContext(BannerContext);
    
    const writingDirection = writingContext.writing.rightToLeft ? 'RightToLeft' : 'LeftToRight';
    const size = Math.ceil(Math.sqrt((writingContext.writing.banners.length + 1) / 16))
    return (
        <div className={'WritingComponent WCDirection_' + writingDirection + ' WCSize_' + size}>
            {writingContext.writing.banners.map((banner, i) =>
                <>
                    {writingContext.writing.cursor == i &&
                        <div className='WCCursor'/>              
                    }
                    <BannerButton key={i} banner={banner}
                        onLeftClick={() => writingContext.updateWriting(
                            (w) => w.moveCursor(i))}
                        onRightClick={() => bannerContext.setBanner(banner)}/>
                </>
            )}
            {writingContext.writing.cursor == writingContext.writing.banners.length &&
                <div className='WCCursor'/>   
            }
            <div className='WCCursorEndHitbox'
                onClick={() => writingContext.updateWriting(
                    (w) => w.moveCursor(writingContext.writing.banners.length))}/>
        </div>
    )
}

