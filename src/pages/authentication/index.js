import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Authentication = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        axios.post("https://conduit.productionready.io/api/users/login",
            {user: {email: email, password: password}})
            .then(res => {
                console.log("success", res);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Login</h1>
                        <p className="text-xs-center">
                            <Link to="/register">Need an account?</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="form-control form-control-lg"
                                    />
                                </fieldset>
                            </fieldset>
                            <fieldset>
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
                            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Authentication;