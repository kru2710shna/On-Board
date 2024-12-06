import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AuthState from './context/Auth/AuthState';
import JobState from './context/Jobs/JobsState';
import GroupState from './context/Groups/GroupState';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthState>
      <JobState>
        <GroupState >
          <App />
        </GroupState>
      </JobState>
    </AuthState>
  </React.StrictMode>,
);