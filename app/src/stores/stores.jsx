import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers/reducers.jsx";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const stores = createStore(reducers, composeEnhancers(applyMiddleware()))

export default stores;