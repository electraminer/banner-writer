import "./ForceSize.css";
// External dependencies
import React from "react";

export default function ForceSize(props: {
    className: string,
    children: React.ReactNode,
    aspectRatio?: string,
}) {
    const ref = React.useRef(null);

    props.className += " ForceSize"
    return (
        <div className={`${props.className} ForceSize`} ref={ref} style={{
            aspectRatio: props.aspectRatio
        }}>
            {props.children}
        </div>
    )
}