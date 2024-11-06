import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AuthState from './context/Auth/AuthState';
import JobState from './context/Jobs/JobsState';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthState>
      <JobState>
        <App />
      </JobState>
    </AuthState>
  </React.StrictMode>,
);