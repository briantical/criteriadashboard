import { SHOW_LOADING_SPINNER } from "../constants/action-types";

const spinner = (state = false, action) => {
    switch (action.type) {
        case SHOW_LOADING_SPINNER:
            return action.payload;

        default:
            return state;
    }
}

export default spinner;