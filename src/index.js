import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for createRoot
import App from './App';

// Find the root element in your HTML
const container = document.getElementById('root');

// Create a root and render your app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
