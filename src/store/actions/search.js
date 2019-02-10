import { addError } from "./errors";
import {SEARCH_PICTURES} from "../actionTypes";

export const search = (searchValue) => ({
    type: SEARCH_PICTURES,
    searchValue,
})

export const searchPictures = (searchValue) => {
    return dispatch => {
        dispatch(search(searchValue))
    }
}