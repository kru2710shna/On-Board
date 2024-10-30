// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root
root.render(<App />); // Render the App
