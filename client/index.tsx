import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import Context from './components/Context';

const appRoot = document.getElementById("app")!;

const root = createRoot(appRoot);

root.render(
<Context>
  <App />
</Context>
);