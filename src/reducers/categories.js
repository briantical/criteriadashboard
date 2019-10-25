import { SET_CATEGORIES } from "../constants/action-types";

const categories = (state = {}, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.payload;

        default:
            return state;
    }
}

export default categories;