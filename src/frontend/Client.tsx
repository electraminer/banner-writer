
import React from 'react';
import ReactDOM from 'react-dom/client';

export default function startClient() {
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <p>Trans Rights</p>
            {/* <RouterProvider router={router} /> */}
        </React.StrictMode>
    );
}