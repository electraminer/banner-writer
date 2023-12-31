import Writing from 'model/Writing';

import React from 'react';
import {produce} from 'immer';
import RecentContext from './RecentContext';
import SavedContext from './SavedContext';

const WritingContext = React.createContext(null);
export default WritingContext;

export function WritingContextProvider({children}) {
    const recentContext = React.useContext(RecentContext);
    const savedContext = React.useContext(SavedContext);

    const [writing, setWriting] = React.useState(new Writing(false));
    const [cursor, setCursor] = React.useState(0);

    const updateWriting = function(update) {
        const newWriting = produce(writing, update);
        setWriting(newWriting)
        savedContext.updateSelected(newWriting.rightToLeft, newWriting.characters());
    }

    const addBanner = function(banner) { 
        updateWriting((w) => w.addBanner(banner));
        recentContext.addBanner(banner);
    }

    return (
        <WritingContext.Provider value={{
            writing: writing,
            setWriting: setWriting,
            updateWriting: updateWriting,
            addBanner: addBanner,
        }}>
            {children}
        </WritingContext.Provider>
    )
}