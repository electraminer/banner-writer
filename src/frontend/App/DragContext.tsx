import "./DragContext.css";
// Internal dependencies
import Writing from "model/Writing";
import Banner from "model/Banner";
// External dependencies
import React from "react";
import BannerComponent from "frontend/BannerComponent/BannerComponent";

const DragContext = React.createContext(null);
export default DragContext;

export function DragContextProvider(props: {children: React.ReactNode}) {
    const [draggedBanner, setDraggedBanner] = React.useState<Banner>(null);
    const [draggedIndex, setDraggedIndex] = React.useState<number>(null);
    const [draggedLine, setDraggedLine] = React.useState<number>(null);
    const [draggedCursor, setDraggedCursor] = React.useState<number>(null);
    const [draggedX, setDraggedX] = React.useState<number>(-100);
    const [draggedY, setDraggedY] = React.useState<number>(-100);

    function setDragged(banner: Banner, index?: number, line?: number, cursor?: number) {
        setDraggedBanner(banner);
        setDraggedIndex(index ?? null);
        setDraggedLine(line ?? null);
        setDraggedCursor(cursor ?? null);
    }

    return (
        <div className="DragContext"
            onMouseDown={(e) => {
                if (draggedBanner) {
                    setDraggedX(e.clientX);
                    setDraggedY(e.clientY);
                }
            }}
            onMouseMove={(e) => {
                if (draggedBanner) {
                    setDraggedX(e.clientX);
                    setDraggedY(e.clientY);
                }
            }}
            onMouseUp={() => setDraggedBanner(null)}>
            <DragContext.Provider value={{
                draggedBanner: draggedBanner,
                index: draggedIndex,
                line: draggedLine,
                cursor: draggedCursor,
                setDraggedBanner: setDragged,
            }}>
                {props.children}
            </DragContext.Provider>
            <div className="DragContext_DraggedBanner" style={{left: `${draggedX - 10}px`, top: `${draggedY - 20}px`}}>
                {draggedBanner && <BannerComponent banner={draggedBanner}></BannerComponent>}
            </div>
        </div>
    );
}