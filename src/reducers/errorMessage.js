import { SET_ERROR_MESSAGE  } from '../constants/action-types';

const errorMessage = (state = {message: "", show: false} , action) =>{
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}

export default errorMessage;