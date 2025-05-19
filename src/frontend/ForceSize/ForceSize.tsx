import "./ForceSize.css";
// External dependencies
import React, { PropsWithChildren } from "react";

export default function ForceSize(props: {
    className: string,
    children: React.ReactNode,
    aspectRatio?: string,
    style?: React.CSSProperties,
}) {
    const ref = React.useRef(null);

    const style = {
        aspectRatio: props.aspectRatio
    };
    return (
        <div className={`${props.className} ForceSize`} ref={ref} style={props.style ?? style}>
            {props.children}
        </div>
    )
}