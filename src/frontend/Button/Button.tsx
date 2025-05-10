import "./Button.css"
// External dependencies
import React from "react";

export default function BannerButton(props: {
    children: React.ReactNode,
    className?: string,
    onLeftClick: (isRight: boolean) => void,
    onRightClick?: (isRight: boolean) => void,
    onBeginDrag?: (isRight: boolean) => void,
    onEndDrag?: (isRight: boolean) => void,
}) {
    const isRight = function(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        return e.clientX > rect.left + rect.width / 2;
    }

    const onClick = function(e: React.MouseEvent<HTMLButtonElement>) {
        props.onLeftClick(isRight(e));
    };

    const onBeginDrag = function(e: React.MouseEvent<HTMLButtonElement>) {
        props.onBeginDrag(isRight(e));
    }

    const onEndDrag = function(e: React.MouseEvent<HTMLButtonElement>) {
        props.onEndDrag(isRight(e));
    }

    const onContextMenu = function(e: React.MouseEvent<HTMLButtonElement>) {
        if (props.onRightClick) {
            props.onRightClick(isRight(e));
            e.preventDefault();
        }
    };

    return (
        <button className={`${props.className} Button`}
            onClick={onClick}
            onContextMenu={onContextMenu}
            onMouseDown={onBeginDrag}
            onMouseUp={onEndDrag}>
            {props.children}
        </button>
    );
}