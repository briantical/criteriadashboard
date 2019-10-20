import {
     SET_ACTIVE_USER,
     SET_TYPING_VALUE, 
     SET_USER_TOKEN, 
     SET_ERROR_MESSAGE, 
     SET_USER_EMAIL, 
     SET_MODAL_VISIBILITY,
     SET_PAGE_VISIBILITY,
     SET_AVAILABLE_CAKES,
     ADD_NEW_CAKE,
     REMOVE_CAKE,
     EDIT_CAKE,
     UPDATE_CAKE,
     SET_CAKE_CATEGORIES
     
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

export const setModalVisibility = (show,modal,modalprops) => ({
    type: SET_MODAL_VISIBILITY,
    payload: {show, modal,modalprops}
});

export const setPageVisibility = (page,show) => ({
    type: SET_PAGE_VISIBILITY,
    payload: {page , show}
});

export const setAvailableCakes = cakes => ({
    type: SET_AVAILABLE_CAKES,
    payload: cakes
});

export const addNewCake = cake => ({
    type: ADD_NEW_CAKE,
    payload: cake
});

export const removeCake = cake => ({
    type: REMOVE_CAKE,
    payload: cake
});

export const editCake = cake => ({
    type: EDIT_CAKE,
    payload: cake
});

export const updateCake = cake => ({
    type: UPDATE_CAKE,
    payload: cake
});

export const setCakeCategories = category => ({
    type: SET_CAKE_CATEGORIES,
    payload: category
});