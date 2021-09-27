import React, { useState, useEffect, useCallback } from "react";

let timer;

export const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token, time) => {},
    logout: () => {},
});

const calculateRemainingTime = (time) => {
    const currentTime = new Date().getTime();
    const expirationTime = new Date(time).getTime();
    const remainingTime = expirationTime - currentTime;
    return remainingTime;
};

const retrieveToken = () => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");
    const remainingTime = calculateRemainingTime(expirationTime);
    if (remainingTime < 6000) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null;
    }
    return { token, remainingTime };
};

const AuthContextProvider = (props) => {
    const authInfor = retrieveToken();
    let initialToken;

    if (authInfor) {
        initialToken = authInfor.token;
    }

    const [token, setToken] = useState(initialToken);

    const isLoggedIn = !!token;

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        if (timer) {
            clearTimeout(timer);
        }
    }, []);

    const login = (token, time) => {
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", time);
        setToken(token);
        timer = setTimeout(logout, calculateRemainingTime(time));
    };

    useEffect(() => {
        if (authInfor) {
            timer = setTimeout(logout, authInfor.remainingTime);
        }
    }, [authInfor, logout]);

    const contextValue = {
        token,
        isLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
