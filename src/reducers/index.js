import { combineReducers } from 'redux';

import user from './user';
import typing from './typing';
import errorMessage from './errorMessage';

export default combineReducers({
    user,
    typing,
    errorMessage
})
