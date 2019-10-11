import { SET_MODAL_VISIBILITY } from "../constants/action-types";

const showModal = (state = false, action) => {
    switch (action.type) {
        case SET_MODAL_VISIBILITY:
            return action.payload;

        default:
            return state;
    }
}

export default showModal;