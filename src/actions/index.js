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
  UPDATE_CAKE,
  SET_CATEGORIES,
  SHOW_LOADING_SPINNER,
  SET_AVAILABLE_SNACKS,
  ADD_NEW_SNACK,
  REMOVE_SNACK,
  UPDATE_SNACK,
  SET_AVAILABLE_ADDONS,
  ADD_NEW_ADDON,
  REMOVE_ADDON,
  UPDATE_ADDON,
  ADD_NEW_CATEGORY,
  REMOVE_CATEGORY,
  SET_AVAILABLE_ORDERS,
  REMOVE_ORDER,
  UPDATE_ORDER,
  ADD_NEW_ORDER,
  SET_AVAILABLE_CART_ITEMS,
  UPDATE_CART
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

export const setModalVisibility = (show, modal, modalprops) => ({
  type: SET_MODAL_VISIBILITY,
  payload: { show, modal, modalprops }
});

export const setPageVisibility = (page, show) => ({
  type: SET_PAGE_VISIBILITY,
  payload: { page, show }
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

export const updateCake = cake => ({
  type: UPDATE_CAKE,
  payload: cake
});

export const showLoadingSpinner = show => ({
  type: SHOW_LOADING_SPINNER,
  payload: show
});

export const setAvailableSnacks = snacks => ({
  type: SET_AVAILABLE_SNACKS,
  payload: snacks
});

export const addNewSnack = snack => ({
  type: ADD_NEW_SNACK,
  payload: snack
});

export const removeSnack = snack => ({
  type: REMOVE_SNACK,
  payload: snack
});

export const updateSnack = snack => ({
  type: UPDATE_SNACK,
  payload: snack
});

export const setAvailableAddons = addons => ({
  type: SET_AVAILABLE_ADDONS,
  payload: addons
});

export const addNewAddon = addon => ({
  type: ADD_NEW_ADDON,
  payload: addon
});

export const removeAddon = addon => ({
  type: REMOVE_ADDON,
  payload: addon
});

export const updateAddon = addon => ({
  type: UPDATE_ADDON,
  payload: addon
});

export const setCategories = category => ({
  type: SET_CATEGORIES,
  payload: category
});

export const addNewCategory = category => ({
  type: ADD_NEW_CATEGORY,
  payload: category
});

export const removeCategory = category => ({
  type: REMOVE_CATEGORY,
  payload: category
});

export const setAvailableOrders = orders => ({
  type: SET_AVAILABLE_ORDERS,
  payload: orders
});

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  payload: order
});

export const removeOrder = order => ({
  type: REMOVE_ORDER,
  payload: order
});

export const addNewOrder = order => ({
  type: ADD_NEW_ORDER,
  payload: order
});

export const setAvailableCartItems = cart => ({
  type: SET_AVAILABLE_CART_ITEMS,
  payload: cart
});

export const updateCart = cart => ({
  type: UPDATE_CART,
  payload: cart
});
