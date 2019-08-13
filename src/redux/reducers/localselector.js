const localSelector = (state = {locals: []}, action) => {
    switch(action.type){
        case 'CHECKED':
            if(action.payload){
                var arr = state.locals.slice();
                arr.push(action.payload);
            	return {
                    ...state,
                    locals: arr
                };
            } else {
                return state;
            }
        case 'NOTCHECKED':
            if(action.payload){
                var arrnum = state.locals.indexOf(action.payload);
                var arr = state.locals.slice();
                arr.splice(arrnum, 1);
            	return {
                    ...state,
                    locals: arr
                };
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default localSelector;