import React, { useState, useEffect } from "react";
import { userActions } from "../../store/user";
import useHttp from "../../hooks/useHttp";
import { getUsers } from "../../lib/api";
import UserList from "./UserList";
import { DUMMY_SUGGESTIONS } from "./DUMMY_SUGGESTIONs";

const SuggestionList = () => {
    const [listUser, setListUser] = useState([]);
    const { sendRequest: getUsersData } = useHttp(
        getUsers,
        userActions.getAllUsers
    );

    useEffect(() => {
        getUsersData();
        const randomIndexes = [];
        const randomUsers = [];
        while (randomIndexes.length < 5) {
            const randomIndex = Math.floor(Math.random() * 20);
            if (randomIndexes.indexOf(randomIndex) === -1) {
                randomIndexes.push(randomIndex);
                randomUsers.push(DUMMY_SUGGESTIONS[randomIndex]);
            }
        }
        setListUser(randomUsers);
    }, [getUsersData]);

    return (
        <React.Fragment>
            {listUser.length > 0 && <UserList listUser={listUser} />}
        </React.Fragment>
    );
};

export default SuggestionList;
