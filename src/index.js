import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store'

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
console.log(store.getState())
serviceWorker.register();