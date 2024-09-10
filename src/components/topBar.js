import React from "react";
import {Link, NavLink, Outlet} from "react-router-dom";

const TopBar = () => {
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
                    </ul>
                </div>
            </nav>
            <Outlet/>
        </div>
    );
}

export default TopBar;