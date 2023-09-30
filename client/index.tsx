import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const appRoot = document.getElementById("app")!;

const root = createRoot(appRoot);

root.render(<App />);