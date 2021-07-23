import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
