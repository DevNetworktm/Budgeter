import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Styles
import "./global.scss";

// Stores
import stores from "./stores/stores.jsx";

// Views
import HomeData from "./views/Home.jsx";
import SignInData from "./views/auth/SignIn.jsx";
import SignUpData from "./views/auth/Signup.jsx";

function App() {
    return (
        <div className="App">
            <Provider store={ stores }>
                <BrowserRouter>
                    <Routes>
                        <Route path={ HomeData.path } element={ <HomeData.views/> }/>

                        {/*    AUTH    */ }
                        <Route path={ SignInData.path } element={ <SignInData.views/> }/>
                        <Route path={ SignUpData.path } element={ <SignUpData.views/> }/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    )
}

export default App;
