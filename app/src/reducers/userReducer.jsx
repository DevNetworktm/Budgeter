import { Reducers } from "../utils/reducer.jsx";
import Types from "../actions/types.jsx";

const State = {
    loggedIn: false,
    token: "",
    username: "",
    test: ""
};

const userReducer = new Reducers(State, (state, { type, payload }) => {
    switch (type) {
        case Types.user.loggedIn:
            return { loggedIn: true, token: payload.token, username: payload.username }
    }
    return state;
});

export default userReducer;