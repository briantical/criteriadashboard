import { combineReducers } from 'redux';

import user from './user';
import typing from './typing';
import errorMessage from './errorMessage';
import token from './token';
import showModal from './showModal';

export default combineReducers({
    user,
    typing,
    errorMessage,
    token,
    showModal
});
