import React, {useContext} from "react";
import {CurrentUserContext} from "../../constexts/currentUser";
import useFetch from "../../hooks/useFetch";
import BackendErrorMessages from "../../components/backendErrorMessages";

const Settings = () => {
    const [currentUserState] = useContext(CurrentUserContext);
    const apiUrl = "/user";
    const [{response, error}, doFetch] = useFetch(apiUrl);

    const handleSubmit = () => {}

    return (
        <div className="settings page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your settings</h1>
                        {error && <BackendErrorMessages backendErrors={error.errors} />}
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="URL of profile picture"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="User name"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        rows="8"
                                        placeholder="Short bio"
                                    ></textarea>
                                </fieldset>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;