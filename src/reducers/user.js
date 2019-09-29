import { SET_ACTIVE_USER, SET_USER_EMAIL } from "../constants/action-types";

const user = (state = null, action) => {
    switch (action.type) {
        case SET_ACTIVE_USER:
            return action.payload;

        case SET_USER_EMAIL:
            return {...state, email: action.payload};

        default:
            return state;
    }
}

export default user;