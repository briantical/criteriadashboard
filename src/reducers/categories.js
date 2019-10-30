import { SET_CATEGORIES, ADD_NEW_CATEGORY, REMOVE_CATEGORY } from "../constants/action-types";

const categories = (state = {}, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.payload;

        case ADD_NEW_CATEGORY:
            return [ action.payload , ...state];
        
        case REMOVE_CATEGORY:
            return state.filter(category => category._id !== action.payload);

        default:
            return state;
    }
}

export default categories;