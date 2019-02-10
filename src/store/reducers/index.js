import {combineReducers} from "redux";
import errors from "./errors";
import pictures from "./pictures";
import search from "./search";

const rootReducer = combineReducers({
    errors,
    pictures,
    search
});

export default rootReducer;