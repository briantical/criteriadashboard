import { SET_CAKE_CATEGORIES } from "../constants/action-types";

const categories = (state = {}, action) => {
    switch (action.type) {
        case SET_CAKE_CATEGORIES:
            return action.payload;

        default:
            return state;
    }
}

export default categories;