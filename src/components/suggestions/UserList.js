import React from "react";
import { Link } from "react-router-dom";
import classes from "./UserList.module.css";
import UserItem from "./UserItem";

const UserList = (props) => {
    return (
        <React.Fragment>
            <div className={classes.header}>
                <h2>Suggestions for you</h2>
                <Link to="/explore">See All</Link>
            </div>
            <ul className={classes.list}>
                {props.listUser &&
                    props.listUser.length > 0 &&
                    props.listUser.map((user) => {
                        return <UserItem key={user.userId} user={user} />;
                    })}
                {props.listUser.length < 0 && <p>No suggestions for you.</p>}
            </ul>
        </React.Fragment>
    );
};

export default UserList;
