import React, {useContext} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {CurrentUserContext} from "../constexts/currentUser";

const TopBar = () => {
    const [currentUserState] = useContext(CurrentUserContext);

    return (
        <div>
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link to={"/"} className="navbar-brand">
                        Medium
                    </Link>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                        </li>
                        {!currentUserState.isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">
                                        Sign in
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">
                                        Sign up
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {currentUserState.isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/articles/new" className="nav-link">
                                        <i className="ion-compose"></i>
                                        &nbsp;New Post
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to={`/profiles/${currentUserState.currentUser.username}`}
                                        className="nav-link"
                                    >
                                        <img className="user-pic" src={currentUserState.currentUser.image} alt="img" />
                                        &nbsp; {currentUserState.currentUser.username}
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <Outlet/>
        </div>
    );
}

export default TopBar;