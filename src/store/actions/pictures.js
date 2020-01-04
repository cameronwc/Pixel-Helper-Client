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
            const outputPictures = filterPictures(pictures, newPictures);
            console.log(outputPictures)
            pageCount++;
            return dispatch(loadPictures(outputPictures, pageCount));
        })
        .catch((err) => {
            dispatch(addError(err.message));
        })
    };
}

const filterPictures = (oldPics, newPics) => {
    oldPics.push.apply(oldPics, newPics);
    return [... new Set(oldPics)];
}

export const removePictures = () => {
    return dispatch => {
        dispatch(remove())
    }
}