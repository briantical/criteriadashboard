import { SET_AVAILABLE_CAKES  } from '../constants/action-types';

const cakes = (state = [] , action) =>{
    switch (action.type) {
        case SET_AVAILABLE_CAKES:
            return action.payload;
        default:
            return state;
    }
}

export default cakes;