import './Client.css';
// Internal dependencies
import App from "./App/App";
// External dependencies
import React from "react";
import ReactDOM from "react-dom/client";

export default function startClient() {
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
}