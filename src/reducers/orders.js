import {
  SET_AVAILABLE_ORDERS,
  REMOVE_ORDER,
  UPDATE_ORDER
} from "../constants/action-types";

const orders = (state = [], action) => {
  switch (action.type) {
    case SET_AVAILABLE_ORDERS:
      return action.payload;

    case REMOVE_ORDER:
      return state.filter(order => order._id !== action.payload);

    case UPDATE_ORDER:
      let newOrder = action.payload;
      return state.map(order => {
        if (order._id === newOrder._id) {
          order = newOrder;
        }
        return order;
      });

    default:
      return state;
  }
};

export default orders;
