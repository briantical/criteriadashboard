import {
  SET_AVAILABLE_CAKES,
  ADD_NEW_CAKE,
  REMOVE_CAKE,
  UPDATE_CAKE
} from "../constants/action-types";

const cakes = (state = [], action) => {
  switch (action.type) {
    case SET_AVAILABLE_CAKES:
      return action.payload;

    case ADD_NEW_CAKE:
      return [action.payload, ...state];

    case REMOVE_CAKE:
      return state.filter(cake => cake._id !== action.payload);

    case UPDATE_CAKE:
      let newCake = action.payload;
      return state.map(cake => {
        if (cake._id === newCake._id) {
          cake = newCake;
        }
        return cake;
      });

    default:
      return state;
  }
};

export default cakes;
