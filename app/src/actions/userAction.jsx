import Types from "./types.jsx";

import { Actions } from "../utils/index.jsx";

class UserAction {
    /**
     * @param {String} username
     * @param {String} token
     * @constructor
     */
    static SignIn(username, token) {
        return Actions(Types.user.loggedIn, { username, token })
    }
}

export default UserAction;