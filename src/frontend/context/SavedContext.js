
import React from "react";
import {CookiesProvider, useCookies} from "react-cookie";
import {produce} from "immer";
import Writing from "model/Writing";

const SavedContext = React.createContext(null);
export default SavedContext;

export function SavedContextProvider({children}) {
    const [saved, setSaved] = React.useState(() =>
        JSON.parse(localStorage.saved || "[]"));
    const [selected, setSelected] = React.useState(-1);

    const updateSaved = function(update) {
        const newSaved = produce(saved, (s) => {update(s)});
        setSaved(newSaved);
        localStorage.saved = JSON.stringify(newSaved);
    }

    const updateSelected = function(rightToLeft, characters) {
        if (selected != -1) {
            updateSaved(saved => saved[selected] = {
                rightToLeft: rightToLeft,
                characters: characters
            });
        }
    }

    const addWriting = function(index, rightToLeft, characters) {
        updateSaved(saved => saved.splice(index, 0, {
            rightToLeft: rightToLeft,
            characters: characters
        }));
        setSelected(index);
    }

    const swap = function(index) {
        updateSaved(saved => {
            const temp = saved[index];
            saved[index] = saved[index + 1];
            saved[index + 1] = temp;
        })
        if (selected == index) {
            setSelected(index + 1);
        } else if (selected == index + 1) {
            setSelected(index);
        }
    }

    const removeSelected = function() {
        updateSaved(saved => saved.splice(selected, 1));
        setSelected(-1);
    }

    const select = function(index) {
        setSelected(index);
        if (index >= 0) {
            const banners = Writing.fromCharacters(saved[index].characters, saved[index].rightToLeft);
            return new Writing(saved[index].rightToLeft, banners.length, ...banners)
        } else {
            return new Writing(false);
        }
    }

    return (
        <CookiesProvider>
            <SavedContext.Provider value={{
                saved: saved,
                selected: selected,
                select: select,
                updateSelected: updateSelected,
                addWriting: addWriting,
                swap: swap,
                removeSelected: removeSelected,
            }}>
                {children}
            </SavedContext.Provider>
        </CookiesProvider>
    );
}