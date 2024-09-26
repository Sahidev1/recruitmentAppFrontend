import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Note that StrictMode causes double renders in Dev environment
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

