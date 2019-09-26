import { SET_USER_TOKEN } from "../constants/action-types";

const token = (state = " ", action) => {
    switch (action.type) {
        case SET_USER_TOKEN:
            return action.payload;

        default:
            return state;
    }
}

export default token;