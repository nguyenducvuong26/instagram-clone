import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./UserList.module.css";
import UserItem from "./UserItem";
import { DUMMY_SUGGESTIONS } from "./DUMMY_SUGGESTIONs";

const UserList = () => {
    const [listUserIndex, setListUserIndex] = useState([]);

    useEffect(() => {
        const randomIndexes = [];
        while (randomIndexes.length < 5) {
            const r = Math.floor(Math.random() * 20) + 1;
            if (randomIndexes.indexOf(r) === -1) randomIndexes.push(r);
        }
        setListUserIndex(randomIndexes);
    }, []);

    return (
        <React.Fragment>
            <div className={classes.header}>
                <h2>Suggestions for you</h2>
                <Link to="/explore">See All</Link>
            </div>
            <ul className={classes.list}>
                {listUserIndex &&
                    listUserIndex.length > 0 &&
                    listUserIndex.map((userIndex) => {
                        return (
                            <UserItem
                                key={DUMMY_SUGGESTIONS[userIndex].userId}
                                user={DUMMY_SUGGESTIONS[userIndex]}
                            />
                        );
                    })}
                {!listUserIndex && <p>No suggestions for you.</p>}
            </ul>
        </React.Fragment>
    );
};

export default UserList;
