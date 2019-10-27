import { SET_AVAILABLE_ADDONS, ADD_NEW_ADDON, REMOVE_ADDON , UPDATE_ADDON } from '../constants/action-types';

const addons = (state = [] , action) =>{
    switch (action.type) {
        case SET_AVAILABLE_ADDONS:
            return action.payload;

        case ADD_NEW_ADDON:
            return [ action.payload , ...state];

        case REMOVE_ADDON:
            return state.filter(snack => snack._id !== action.payload);

        case UPDATE_ADDON:
            let newAddon = action.payload
            return state.map((addon)=>{
                if(addon._id === newAddon._id){
                    addon = newAddon
                }
                return addon;
            })

        default:
            return state;
    }
}

export default addons;