import { SET_ACTIVE_USER , SET_TYPING_VALUE , SET_ACTIVE_USER_TOKEN, SET_ERROR_MESSAGE} from "../constants/action-types";

export const setActiveUser = user => ({
    type: SET_ACTIVE_USER,
    payload: user
});

export const setTypingValue = value => ({
    type: SET_TYPING_VALUE,
    payload: value
});

export const setActiveUserToken = token => ({
    type: SET_ACTIVE_USER_TOKEN,
    payload: token
});

export const setErrorMessage = error => ({
    type: SET_ERROR_MESSAGE,
    payload: error
});
