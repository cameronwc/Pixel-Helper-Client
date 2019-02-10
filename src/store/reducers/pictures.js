import { LOAD_PICTURES, REMOVE_PICTURES } from "../actionTypes";

export default (state = { pictures: [] }, action ) => {
    switch(action.type) {
        case LOAD_PICTURES:
            return {...state, pictures: action.pictures, pageCount: action.pageCount};
        case REMOVE_PICTURES:
            return {...state, pictures: [], pageCount: 1};
        default:
            return state;
    }
}