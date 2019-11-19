import {
  SET_AVAILABLE_CART_ITEMS,
  UPDATE_CART
} from "../constants/action-types";

const carts = (state = [], action) => {
  switch (action.type) {
    case SET_AVAILABLE_CART_ITEMS:
      return action.payload;

    case UPDATE_CART:
      let newCart = action.payload;
      return state.map(cart => {
        if (cart._id === newCart._id) {
          cart = newCart;
        }
        return cart;
      });

    default:
      return state;
  }
};

export default carts;
