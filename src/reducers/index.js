import { combineReducers } from 'redux';

import activeUser from './activeUser';
import typing from './typing';

export default combineReducers({
    activeUser,
    typing
})
