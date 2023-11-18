import React from 'react';

const ColorContext = React.createContext(null);
export default ColorContext;

export function ColorContextProvider(props) {
    const [primary, setPrimary] = React.useState(3);
    const [secondary, setSecondary] = React.useState(0);

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
