if(!window._babelPolyfill){
  require('babel-polyfill');
}
import React from 'react';
import {render} from 'react-dom';
import App from './containers/App'; // Top level wrapper component

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
// import './favicon.ico';
import './styles/fonts/Roboto/roboto.css';
import './styles/index.scss';

import { BrowserRouter } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

// console.log(history);

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('app')
);
