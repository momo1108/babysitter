import { PASS_ID } from "../actions/actionTypes";
const initialState = {
    id: ''
};
const idpassReducer = (state = initialState, action) => {
    switch(action.type){
        case PASS_ID:
            if(action.payload){
            	return {
                    ...state,
                    id: action.payload
                };
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default idpassReducer;