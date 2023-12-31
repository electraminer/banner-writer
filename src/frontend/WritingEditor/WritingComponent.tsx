// import "./WritingComponent.css"

// import BannerContext from "frontend/context/BannerContext";
// import WritingContext from "frontend/context/WritingContext";
// import BannerButton from "../Button/Button";

// import React from "react";
// import Writing from "../../model/Writing";
// import BannerComponent from "../Banner/BannerComponent";

// export default function WritingEditor(props: {
//     writing: Writing,
//     updateWriting: (update: (writing: Writing) => void) => void,
//     cursor: number,
//     setCursor: (cursor: number) => void,
// }) {
//     const writingContext = React.useContext(WritingContext);
//     const bannerContext = React.useContext(BannerContext);
    
//     const writingDirection = props.writing.rightToLeft ? "RightToLeft" : "LeftToRight";
//     return (
//         <div className={"WritingEditor WCDirection_" + writingDirection}>
//             {props.writing.lines.map((line, i) =>
//                 <div className='WritingEditorLine' key={i}>
//                     {line.map((banner, j) =>
//                         (banner ?
//                             <BannerComponent banner={banner} key={j}></BannerComponent>
//                         :
//                             <div className='BannerComponent'>&nbsp;</div>
//                         )
//                     )}
//                 </div>
//             )}
//             {writingContext.writing.banners.map((banner, i) =>
//                 <>
//                     {writingContext.writing.cursor == i &&
//                         <div className="WCCursor"/>              
//                     }
//                     <BannerButton key={i} banner={banner}
//                         onLeftClick={() => writingContext.updateWriting(
//                             (w) => w.moveCursor(i))}
//                         onRightClick={() => bannerContext.setBanner(banner)}/>
//                 </>
                
//             )}
//             {writingContext.writing.cursor == writingContext.writing.banners.length &&
//                 <div className="WCCursor"/>   
//             }
//             <div className="WCCursorEndHitbox"
//                 onClick={() => writingContext.updateWriting(
//                     (w) => w.moveCursor(writingContext.writing.banners.length))}/>
//         </div>
//     )
// }

