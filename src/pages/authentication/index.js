import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useLocalStorage from "hooks/useLocalStorage";
import {CurrentUserContext} from "constexts/currentUser";
import BackendErrorMessages from "./components/backendErrorMessages";
import useFetch from "hooks/useFetch";

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
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
    const [, setToken] = useLocalStorage("tokenMedium");
    const [, dispatch] = useContext(CurrentUserContext);
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = isLogin ? {email, password } : {username, email, password};
        doFetch({
            method: "post",
            data: { user },
        })
    };

    useEffect(() => {
        if (!response) return;
        setToken(response.user.token);
        setIsSuccessfullSubmit(true);
        dispatch({type: "SET_AUTHORIZED", payload: response.user});
    }, [response, setToken, dispatch]);

    useEffect(() => {
        if (isSuccessfullSubmit) {
            return navigate("/");
        }
    }, [isSuccessfullSubmit, navigate]);

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
                            {error && <BackendErrorMessages backendErrors={error.errors} /> }
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
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary pull-xs-right"
                                disabled={isLoading}
                            >{pageTitle}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Authentication;