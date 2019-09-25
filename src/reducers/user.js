import { SET_ACTIVE_USER, SET_ACTIVE_USER_TOKEN } from "../constants/action-types";

const user = (state = null, action) => {
    switch (action.type) {
        case SET_ACTIVE_USER:
            return action.payload;

        case SET_ACTIVE_USER_TOKEN:
            return action.payload;

        default:
            return state;
    }
}

export default user;