import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom';
import App from './App';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </HashRouter>,
);
