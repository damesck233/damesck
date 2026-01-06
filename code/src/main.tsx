import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import 'overlayscrollbars/styles/overlayscrollbars.css';
import { OverlayScrollbars } from 'overlayscrollbars';

// Initialize global scrollbars for body
OverlayScrollbars(document.body, {
  scrollbars: {
    theme: 'os-theme-dark',
    autoHide: 'move',
    clickScroll: true,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
