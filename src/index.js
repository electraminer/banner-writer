import './index.css';

import App from './components/App.js';
import { BannerContextProvider } from 'components/context/BannerContext';
import { WritingContextProvider } from 'components/context/WritingContext';
import { RecentContextProvider } from 'components/context/RecentContext';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { SavedContextProvider } from 'components/context/SavedContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SavedContextProvider>
      <RecentContextProvider>
        <BannerContextProvider>
          <WritingContextProvider>
            <App />
          </WritingContextProvider>
        </BannerContextProvider>
      </RecentContextProvider>
    </SavedContextProvider>
  </React.StrictMode>
);