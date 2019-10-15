import { SET_AVAILABLE_CAKES, ADD_NEW_CAKE, REMOVE_CAKE  } from '../constants/action-types';

const cakes = (state = [] , action) =>{
    switch (action.type) {
        case SET_AVAILABLE_CAKES:
            return action.payload;

        case ADD_NEW_CAKE:
            return [ action.payload , ...state];

        case REMOVE_CAKE:
            //console.log(state.filter(cake => cake._id !== action.payload._id))
            console.log('ghjk' + action.payload)
            return state.filter(cake => cake._id !== action.payload._id);

        default:
            return state;
    }
}

export default cakes;