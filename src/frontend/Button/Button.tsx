import "./Button.css"
// External dependencies
import React from "react";

export default function BannerButton(props: {
    children: React.ReactNode,
    className?: string,
    onLeftClick: () => void,
    onRightClick?: () => void,
}) {
    const onClick = function(e) {
        props.onLeftClick();
    };

    const onContextMenu = function(e) {
        if (props.onRightClick) {
            props.onRightClick();
            e.preventDefault();
        }
    };

    return (
        <button className={`${props.className} Button`}
            onClick={onClick}
            onContextMenu={onContextMenu}>
            {props.children}
        </button>
    );
}