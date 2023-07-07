import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// Utils
import { RouteData } from "../../utils/routes.jsx";
import { InputHandler } from "../../utils/index.jsx";

// Services
import AuthServices from "../../services/Auth.jsx";

// Views
import SignInData from "./SignIn.jsx";

// Styles
import "./styles/SignIn.scss"

const SignUpData = new RouteData({
    name: "SignUpData",
    path: "/auth/signUp",
    views: SignUp
})

function SignUp() {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        AuthServices.SignUp(username, password);
        navigate(SignInData.path)
    }

    return (
        <section id="section-signin">
            <article className="article-signin">
                <div>
                    <img src="/logo.png" alt=""/>
                </div>
                <div>
                    <form onSubmit={ handleSubmit }>
                        <h2 className="acR title-of-element">Sign Up</h2>
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
                            <button type="submit" className={ "acRButton--medium round--full" }>Sign Up</button>
                        </div>
                        <p>I already have an account, <Link to={ SignInData.path }>sign in</Link></p>
                    </form>
                </div>
            </article>
        </section>
    )
}

export default SignUpData;