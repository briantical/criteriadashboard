import { combineReducers } from 'redux';

import user from './user';
import typing from './typing';
import errorMessage from './errorMessage';
import token from './token';
import showModal from './showModal';
import showPage from './showPage';
import cakes from './cakes';
import categories from './categories';
import spinner from './spinner';
import snacks from './snacks';
import addons from './addons';

export default combineReducers({
    user,
    typing,
    errorMessage,
    token,
    showModal,
    showPage,
    cakes,
    categories,
    spinner,
    snacks,
    addons
});
