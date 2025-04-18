import './Client.css';
// Internal dependencies
import App from "./App/App";
import AboutPage from "./AboutPage/AboutPage";
import { SettingsContextProvider } from './SettingsContext';
// External dependencies
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConfigPage from './ConfigPage/ConfigPage';

const router = createBrowserRouter([
    {path: "/", element:
        <SettingsContextProvider>
            <App/>
        </SettingsContextProvider>,
    },
    {path: "/about", element:
        <SettingsContextProvider>
            <AboutPage/>
        </SettingsContextProvider>,
    },
    {path: "/cfg", element:
        <SettingsContextProvider>
            <ConfigPage/>
        </SettingsContextProvider>,
    }
]);

export default function Client() {
    return <RouterProvider router={router} />
}