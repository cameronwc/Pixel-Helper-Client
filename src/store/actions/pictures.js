import { addError } from "./errors";
import {LOAD_PICTURES, REMOVE_PICTURES} from "../actionTypes";

export const loadPictures = (pictures, pageCount) => ({
    type: LOAD_PICTURES,
    pageCount,
    pictures
})

export const remove = () => ({
    type: REMOVE_PICTURES
})

export const fetchPictures = (pictures, url, pageCount) => {
    url = !url.includes('?') ? url += '?' : url += '&';
    if(typeof pageCount == 'undefined') {
        pageCount = 1;
    }
    url = `${url}page=${pageCount}`;
    return dispatch => {
        return fetch(url)
        .then((res) => res.json())
        .then((newPictures) => {
            pictures.push.apply(pictures, newPictures);
            pageCount++;
            return dispatch(loadPictures(pictures, pageCount));
        })
        .catch((err) => {
            dispatch(addError(err.message));
        })
    };
}

export const removePictures = () => {
    return dispatch => {
        dispatch(remove())
    }
}