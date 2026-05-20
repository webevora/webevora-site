import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/style.css';
import App from './App';

// redirect handling for GitHub Pages 404.html workaround
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;

if (redirect && redirect !== window.location.href) {
  window.history.replaceState(null, null, redirect);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

