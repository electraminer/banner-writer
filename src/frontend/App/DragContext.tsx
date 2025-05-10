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
    const [draggedX, setDraggedX] = React.useState<number>(-100);
    const [draggedY, setDraggedY] = React.useState<number>(-100);

    return (
        <div className="DragContext"
            onMouseMove={(e) => {
                setDraggedX(e.clientX);
                setDraggedY(e.clientY);
            }}
            onMouseUp={() => setDraggedBanner(null)}>
            <DragContext.Provider value={{
                draggedBanner: draggedBanner,
                setDraggedBanner: setDraggedBanner,
            }}>
                {props.children}
            </DragContext.Provider>
            <div className="DragContext_DraggedBanner" style={{left: `${draggedX - 10}px`, top: `${draggedY - 20}px`}}>
                {draggedBanner && <BannerComponent banner={draggedBanner}></BannerComponent>}
            </div>
        </div>
    );
}