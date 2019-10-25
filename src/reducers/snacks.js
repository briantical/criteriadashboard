import { SET_AVAILABLE_SNACKS, ADD_NEW_SNACK, REMOVE_SNACK , UPDATE_SNACK } from '../constants/action-types';

const snacks = (state = [] , action) =>{
    switch (action.type) {
        case SET_AVAILABLE_SNACKS:
            return action.payload;

        case ADD_NEW_SNACK:
            return [ action.payload , ...state];

        case REMOVE_SNACK:
            return state.filter(snack => snack._id !== action.payload);

        case UPDATE_SNACK:
            let newSnack = action.payload
            return state.map((snack)=>{
                if(snack._id === newSnack._id){
                    snack = newSnack
                }
                return snack;
            })

        default:
            return state;
    }
}

export default snacks;