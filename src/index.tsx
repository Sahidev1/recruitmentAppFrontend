import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { checkAuthenticationState } from './apis/authAPI';
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



// Note that StrictMode causes double renders in Dev environment
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

//heckAuthenticationState().then(e => console.log(e)).catch(err => console.log(err))

