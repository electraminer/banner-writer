// Internal dependencies
import Color from "model/Color";
// External dependencies
import React from "react";

const ColorContext = React.createContext(null);
export default ColorContext;

export function ColorContextProvider(props: {children: React.ReactNode}) {
    const [primary, setPrimary] = React.useState(Color.BLACK);
    const [secondary, setSecondary] = React.useState(Color.WHITE);

    const swap = function() {
        const temp = primary;
        setPrimary(secondary);
        setSecondary(temp);
    }

    return (
        <ColorContext.Provider value={{
            primary: primary,
            secondary: secondary,
            setPrimary: setPrimary,
            setSecondary: setSecondary,
            swap: swap,
        }}>
            {props.children}
        </ColorContext.Provider>
    )
}
