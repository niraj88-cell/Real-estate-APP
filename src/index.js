import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { AuthContextProvider } from './context/AuthContext';  // No need for `.js` extension
import { SocketContextProvider } from './context/SocketContext';  // No need for `.js` extension

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();