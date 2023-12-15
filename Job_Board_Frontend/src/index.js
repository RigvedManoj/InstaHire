import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './interceptors/axios';

// This is the initial javascript file that is called. This calls App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

