import { SET_ACTIVE_USER_ID , SET_TYPING_VALUE , SET_ACTIVE_USER_TOKEN, SET_ERROR_MESSAGE} from "../constants/action-types";

export const setActiveUserId = id => ({
    type: SET_ACTIVE_USER_ID,
    payload: id
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
