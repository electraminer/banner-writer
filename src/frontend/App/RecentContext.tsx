// Internal dependencies
import Writing from "model/Writing";
import Banner from "model/Banner";
// External dependencies
import React from "react";

const RecentContext = React.createContext(null);
export default RecentContext;

export function RecentContextProvider(props: {children: React.ReactNode}) {
    const [recent, setRecent] = React.useState(() =>
        Writing.fromString(localStorage.recent || "")[0].lines[0]);

    const addBanner = function(banner: Banner) {
        let newRecent = recent.filter((b) => b.toCode() != banner.toCode());
        newRecent.push(banner);
        setRecent(newRecent);
        localStorage.recent = new Writing(false, newRecent).toString();
    }
    
    const deleteBanner = function(banner: Banner) {
        let newRecent = recent.filter((b) => b.toCode() != banner.toCode());
        setRecent(newRecent);
        localStorage.recent = new Writing(false, newRecent).toString();
    }

    return (
        <RecentContext.Provider value={{
            recent: recent,
            addBanner: addBanner,
            deleteBanner: deleteBanner,
        }}>
            {props.children}
        </RecentContext.Provider>
    );
}