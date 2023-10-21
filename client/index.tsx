import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';


const appRoot = document.getElementById("app")!;

const root = createRoot(appRoot);

root.render(
  <div>
    <App />
  </div>
);