import { SET_AVAILABLE_CAKES, ADD_NEW_CAKE  } from '../constants/action-types';

const cakes = (state = [] , action) =>{
    switch (action.type) {
        case SET_AVAILABLE_CAKES:
            return action.payload;

        case ADD_NEW_CAKE:
            return [ action.payload , ...state];

        default:
            return state;
    }
}

export default cakes;