import { useEffect } from "react";
import { userActions } from "../../store/user";
import useHttp from "../../hooks/useHttp";
import { getUsers } from "../../lib/api";
import UserList from "./UserList";

const SuggestionList = () => {
    const { sendRequest: getUsersData } = useHttp(
        getUsers,
        userActions.getAllUsers
    );

    useEffect(() => {
        getUsersData();
    }, [getUsersData]);

    return <UserList />;
};

export default SuggestionList;
