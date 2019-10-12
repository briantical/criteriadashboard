import { SET_PAGE_VISIBILITY } from "../constants/action-types";

const showPage = (state = false, action) => {
    switch (action.type) {
        case SET_PAGE_VISIBILITY:
            return action.payload;

        default:
            return state;
    }
}

export default showPage;