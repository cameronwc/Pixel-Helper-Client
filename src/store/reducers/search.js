import { SEARCH_PICTURES } from "../actionTypes";

export default (state = { searchValue: '' }, action ) => {
    switch(action.type) {
        case SEARCH_PICTURES:
            return {...state, searchValue: action.searchValue};
        default:
            return state;
    }
}