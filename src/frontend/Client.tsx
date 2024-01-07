import './Client.css';
// Internal dependencies
import App from "./App/App";
import AboutPage from "./AboutPage/AboutPage";
import { SettingsContextProvider } from './SettingsContext';
// External dependencies
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {path: "/", element:
        <SettingsContextProvider>
            <App/>
        </SettingsContextProvider>,
    },
    {path: "/about", element:
        <AboutPage/>,
    }
]);

export default function Client() {
    return <RouterProvider router={router} />
}