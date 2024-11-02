import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AuthState from './context/Auth/AuthState';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthState>
    <App />
  </AuthState>
);