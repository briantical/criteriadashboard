import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store'

const render = () => {
    console.log(store.getState());
    ReactDOM.render(<App />, document.getElementById('root'));
}
render();

store.subscribe(render);

serviceWorker.register();