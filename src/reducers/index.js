import { combineReducers } from 'redux';

import activeUser from './activeUser';
import typing from './typing';
import errorMessage from './errorMessage';

export default combineReducers({
    activeUser,
    typing,
    errorMessage
})
