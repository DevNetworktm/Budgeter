import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

// Stores
import Stores from "../../stores/stores.jsx";

// ActionsRedux
import userAction from "../../actions/userAction.jsx";

// Services
import AuthServices from "../../services/Auth.jsx";

// Utils
import { RouteData } from "../../utils/routes.jsx";
import { InputHandler } from "../../utils/index.jsx";

// Views
import SignUpData from "./Signup.jsx";
import HomeData from "../Home.jsx";

// Styles
import "./styles/SignIn.scss"

const SignInData = new RouteData({
    name: "SignInData",
    path: "/auth/signIn",
    views: SignIn
})

function SignIn() {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const { jwt } = await AuthServices.SignIn(username, password);
        Stores.dispatch(userAction.SignIn(username, jwt))
        navigate(HomeData.path);
    }

    return (
        <section id="section-signin">
            <article className="article-signin">
                <div>
                    <img src="/logo.png" alt=""/>
                </div>
                <div>
                    <form onSubmit={ handleSubmit }>
                        <h2 className="acR title-of-element">Sign In</h2>
                        <div className="form-control-signin">
                            <label htmlFor="username">Your Username :</label>
                            <input onChange={ InputHandler(setUsername) } autoComplete={ "off" } type="text"
                                   id={ "username" } className={ "basic-input" }/>
                        </div>
                        <div className="form-control-signin">
                            <label htmlFor="password">Your Password :</label>
                            <input onChange={ InputHandler(setPassword) } type="password" id={ "password" }
                                   className={ "basic-input" }/>
                        </div>
                        <div className={ "form-control-button-signin" }>
                            <button type="submit" className={ "acRButton--medium round--full" }>Sign In</button>
                        </div>
                        <p>I do not have an account, <Link to={ SignUpData.path }>sign up</Link></p>
                    </form>
                </div>
            </article>
        </section>
    )
}

export default SignInData;