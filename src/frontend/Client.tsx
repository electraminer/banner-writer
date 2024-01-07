import './Client.css';
// Internal dependencies
import App from "./App/App";
import AboutPage from "./AboutPage/AboutPage";
import { SettingsContextProvider } from './SettingsContext';
// External dependencies
import React from "react";
import ReactDOM from "react-dom/client";
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

export default function startClient() {
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}