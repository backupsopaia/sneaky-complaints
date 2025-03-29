
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/theme/ThemeContext';
import { AuthProvider } from './context/auth/AuthContext';
import { ContentProvider } from './context/content';
import App from './App';
import './index.css';

// Initialize MSW in development mode only
async function initMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    return worker.start({ onUnhandledRequest: 'bypass' });
  }
  return Promise.resolve();
}

// Initialize the app after MSW setup
initMocks().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ContentProvider>
              <App />
            </ContentProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>,
  );
});
