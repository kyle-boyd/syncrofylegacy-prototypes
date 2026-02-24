import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import tokens from '@design-system';
import App from './App';
import './index.css';

// Vite exposes the current base path as import.meta.env.BASE_URL
// - In dev: '/'
// - On GitHub Pages: '/syncrofylegacy-prototypes/'
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={tokens}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
