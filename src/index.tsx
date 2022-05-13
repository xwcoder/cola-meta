import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

import '@tarojs/components/dist/taro-components/taro-components.css';
import 'antd/dist/antd.css';
// eslint-disable-next-line import/no-unresolved
import 'windi.css';
import './style.css';

(window as any).store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
