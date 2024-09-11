import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import useLocalStorage from "hooks/useLocalStorage";
import {CurrentUserContext} from "constexts/currentUser";

const Authentication = () => {
    const isLogin = useLocation().pathname === "/login";
    const pageTitle = isLogin ? "Sign In" : "Sign Up";
    const desctiptionLink = isLogin ? "/register" : "/login";
    const descriptionText = isLogin ? "Need an account?" : "Have an account?";
    const apiUrl = isLogin ? "/users/login" : "/users";
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [data, setData] = useState(null);
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
    const [token, setToken] = useLocalStorage("token");
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
    console.log("currentUserState", currentUserState)

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = isLogin ? {email, password } : {username, email, password};
        axios.post(`https://conduit.productionready.io/api${apiUrl}`,
            { user })
            .then(res => {
                console.log("success", res);
                setData(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (!data) return;
        setToken(data.user.token);
        setIsSuccessfullSubmit(true);
        setCurrentUserState(state => ({
            ...state,
            isLoading: false,
            isLoggedIn: true,
            currentUser: data.user,
        }))
    }, [data, setToken]);

    useEffect(() => {
        if (isSuccessfullSubmit) {
            return navigate("/");
        }
    }, [isSuccessfullSubmit]);

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{pageTitle}</h1>
                        <p className="text-xs-center">
                            <Link to={desctiptionLink}>{descriptionText}</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                {!isLogin && (
                                    <fieldset className="form-group">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="User name"
                                            className="form-control form-control-lg"
                                        />
                                    </fieldset>
                                )}
                                <fieldset className="form-group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="form-control form-control-lg"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="form-control form-control-lg"
                                    />
                                </fieldset>
                            </fieldset>
                            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">{pageTitle}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Authentication;