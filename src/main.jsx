import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'src/App';
import { BrowserRouter } from 'react-router-dom';

import { store } from 'src/store/store';
import { Provider as ReduxToolkitProvider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxToolkitProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxToolkitProvider>
  </React.StrictMode>,
);
