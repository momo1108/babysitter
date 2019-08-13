import { ON_LOGGED, OFF_LOGGED, SET_USER } from "../actions/actionTypes";

const initialState = {
  logged: false,
  user: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case ON_LOGGED: {
        return {
          ...state,
          logged: action.logged
        };
      }
      case OFF_LOGGED: {
          return {
              ...state,
              logged: action.logged
          };
      }
      case SET_USER: {
        return {
          ...state,
          user: action.user
        };
    }
      default:
        return state;
    }
}
