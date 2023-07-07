import Axios from "axios";
import "./_api.jsx";

class AuthServices {
    static async SignUp(username, password) {
        await Axios.post('/auth/signup', { username, password })
    }

    static async SignIn(username, password) {
        return await Axios.post('/auth/signin', { username, password })
    }
}

export default AuthServices