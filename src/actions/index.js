import { SET_ACTIVE_USER , SET_TYPING_VALUE , SET_USER_TOKEN, SET_ERROR_MESSAGE, SET_USER_EMAIL} from "../constants/action-types";

export const setActiveUser = user => ({
    type: SET_ACTIVE_USER,
    payload: user
});

export const setUserEmail = email => ({
    type: SET_USER_EMAIL,
    payload: email
});

export const setTypingValue = value => ({
    type: SET_TYPING_VALUE,
    payload: value
});

export const setErrorMessage = error => ({
    type: SET_ERROR_MESSAGE,
    payload: error
});

export const setUserToken = token => ({
    type: SET_USER_TOKEN,
    payload: token
});

