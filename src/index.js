import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store'

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
console.log(store.getState());
serviceWorker.register();