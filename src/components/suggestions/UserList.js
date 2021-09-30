import React from "react";
import { Link } from "react-router-dom";
import classes from "./UserList.module.css";
import UserItem from "./UserItem";
import { DUMMY_SUGGESTIONS } from "./DUMMY_SUGGESTIONs";

const UserList = () => {
    const randomIndexs = [];
    while (randomIndexs.length < 5) {
        const r = Math.floor(Math.random() * 20) + 1;
        if (randomIndexs.indexOf(r) === -1) randomIndexs.push(r);
    }
    return (
        <React.Fragment>
            <div className={classes.header}>
                <h2>Suggestions for you</h2>
                <Link to="/explore">See All</Link>
            </div>
            <ul className={classes.list}>
                {randomIndexs.map((randomIndex) => {
                    return (
                        <UserItem
                            key={DUMMY_SUGGESTIONS[randomIndex].userId}
                            user={DUMMY_SUGGESTIONS[randomIndex]}
                        />
                    );
                })}
            </ul>
        </React.Fragment>
    );
};

export default UserList;
