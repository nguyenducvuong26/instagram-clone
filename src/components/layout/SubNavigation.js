import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useHistory } from "react-router";

import classes from "./SubNavigation.module.css";
import { Link } from "react-router-dom";

const SubNavigation = () => {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = () => {
        logout();
        history.push("/login");
    };

    return (
        <ul className={classes.subnav}>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li onClick={logoutHandler}>Logout</li>
        </ul>
    );
};

export default SubNavigation;
