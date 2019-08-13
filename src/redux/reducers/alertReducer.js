import { OPEN_ALERT, CLOSE_ALERT} from "../actions/actionTypes";
const initialState = {
    message: null,
    heading: null,
    cb: null,
    show: false,
    variant: null,
};
export default function(state = initialState, action) {
    switch (action.type) {
      case OPEN_ALERT: {
        return {
            ...action.alert
        };
      }
      case CLOSE_ALERT: {
          return {
               ...initialState
          };
      }
      default:
        return state;
    }
}
