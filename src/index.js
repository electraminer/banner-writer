// import './index.css';

// import App from './components/App.js';
// import AboutPage from './components/AboutPage/AboutPage';
// import { BannerContextProvider } from 'components/context/BannerContext';
// import { WritingContextProvider } from 'components/context/WritingContext';
// import { RecentContextProvider } from 'components/context/RecentContext';

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { SavedContextProvider } from 'components/context/SavedContext';

// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <SavedContextProvider>
//               <RecentContextProvider>
//                 <BannerContextProvider>
//                   <WritingContextProvider>
//                     <App />
//                   </WritingContextProvider>
//                 </BannerContextProvider>
//               </RecentContextProvider>
//             </SavedContextProvider>,
//   },
//   {
//     path: "/about",
//     element: <AboutPage/>,
//   }
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <p>Trans Rights</p>
//     {/* <RouterProvider router={router} /> */}
//   </React.StrictMode>
// );

import startClient from "./frontend/Client";
startClient();
