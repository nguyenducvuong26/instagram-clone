import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../contexts/auth-context";
import classes from "./MainNavigation.module.css";
import {
    AiOutlineHome,
    AiOutlineMessage,
    AiOutlineCompass,
    AiOutlineHeart,
} from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";
import SubNavigation from "./SubNavigation";

const MainNavigation = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [showSubNav, setShowSubNav] = useState(false);
    const photoUrl = useSelector((state) => state.user.photoUrl);

    const showSubNavHandler = () => {
        setShowSubNav((prevState) => !prevState);
    };

    return (
        <React.Fragment>
            <div className={classes.mainHeader}>
                <div className={classes.navigation}>
                    <div className={classes.logo}>
                        <Link to="/">
                            <img
                                alt="instagram-logo"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            />
                        </Link>
                    </div>
                    <div className={classes.search}>
                        <input type="text" placeholder="Search" />
                    </div>
                    <nav className={classes.nav}>
                        <ul>
                            {isLoggedIn && (
                                <li>
                                    <NavLink
                                        activeClassName={classes.active}
                                        to="/"
                                        exact
                                    >
                                        <AiOutlineHome />
                                    </NavLink>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li>
                                    <NavLink
                                        activeClassName={classes.active}
                                        to="/inbox"
                                    >
                                        <AiOutlineMessage />
                                    </NavLink>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li>
                                    <NavLink
                                        activeClassName={classes.active}
                                        to="/explore"
                                    >
                                        <AiOutlineCompass />
                                    </NavLink>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li>
                                    <div>
                                        <AiOutlineHeart />
                                    </div>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li onClick={showSubNavHandler}>
                                    <div>
                                        <img alt="user-avatar" src={photoUrl} />
                                    </div>
                                    {showSubNav && <SubNavigation />}
                                </li>
                            )}
                            {!isLoggedIn && (
                                <li className={classes.login}>Login</li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
            <div style={{ height: "54px" }}></div>
        </React.Fragment>
    );
};

export default MainNavigation;
