
import React from "react";
import Writing from "model/Writing";

const RecentContext = React.createContext(null);
export default RecentContext;

export function RecentContextProvider({children}) {
    const [recent, setRecent] = React.useState(() =>
        Writing.fromCharacters(localStorage.recent || '', false));

    const addBanner = function(banner) {
        let newRecent = recent.filter((b) => b.characters() != banner.characters());
        newRecent.push(banner);
        setRecent(newRecent);
        localStorage.recent = new Writing(false, 0, ...newRecent).characters();
    }

    return (
        <RecentContext.Provider value={{
            recent: recent,
            addBanner: addBanner,
        }}>
            {children}
        </RecentContext.Provider>
    );
}