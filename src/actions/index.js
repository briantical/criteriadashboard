import {
     SET_ACTIVE_USER,
     SET_TYPING_VALUE, 
     SET_USER_TOKEN, 
     SET_ERROR_MESSAGE, 
     SET_USER_EMAIL, 
     SET_MODAL_VISIBILITY,
     SET_PAGE_VISIBILITY

    } from "../constants/action-types";

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

export const setModalVisibility = show => ({
    type: SET_MODAL_VISIBILITY,
    payload: show
});

export const setPageVisibility = (page,show) => ({
    type: SET_PAGE_VISIBILITY,
    payload: {page , show}
});