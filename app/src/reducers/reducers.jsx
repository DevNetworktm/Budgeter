import { combineReducers } from "redux";
import userReducer from "./userReducer.jsx";

const reducers = combineReducers({
    user: userReducer
});


export default reducers;