import { SET_ACTIVE_USER_ID, SET_ACTIVE_USER_TOKEN } from "../constants/action-types";

const activeUser = (state = null, action) => {
    switch (action.type) {
        case SET_ACTIVE_USER_ID:
            return action.payload;

        case SET_ACTIVE_USER_TOKEN:
            return action.payload;

        default:
            return state;
    }
}

export default activeUser;