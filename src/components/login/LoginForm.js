import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/useInput";
import useHttp from "../../hooks/useHttp";
import { addUser } from "../../lib/api";
import { userActions } from "../../store/user";
import classes from "./LoginForm.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import ModalHelper from "../UI/ModalHelper";

const validateEmail = (value) => {
    const regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(value.trim());
};

const validatePassword = (value) => {
    return value.trim().length >= 6;
};

const LoginForm = () => {
    const [loginMode, setLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { login } = useContext(AuthContext);
    const history = useHistory();

    const { sendRequest } = useHttp(addUser, userActions.addUser);

    const changeModeHandler = () => {
        setLoginMode((prevMode) => !prevMode);
    };

    const closeModalHandler = () => {
        setShowModal(false);
        setError(null);
    };

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
    } = useInput(validateEmail);

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
    } = useInput(validatePassword);

    const emailClasses = emailHasError
        ? `${classes["form-control"]} ${classes.invalid}`
        : classes["form-control"];

    const passwordClasses = passwordHasError
        ? `${classes["form-control"]} ${classes.invalid}`
        : classes["form-control"];

    let formIsValid = false;

    if (emailIsValid && passwordIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const enteredEmail = email;
        const enteredPassword = password;
        let url;

        if (formIsValid && loginMode) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCy3DlecRc2J-D1JH_4vF-B1ssMgnulLg4";
        } else if (formIsValid && !loginMode) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCy3DlecRc2J-D1JH_4vF-B1ssMgnulLg4";
        } else {
            emailBlurHandler();
            passwordBlurHandler();
            return;
        }

        setIsLoading(true);

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                setIsLoading(false);
                resetEmail();
                resetPassword();
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((data) => {
                        let errorMessage = "Authentication failed!";
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                if (!loginMode) {
                    sendRequest({
                        email: enteredEmail,
                        password: enteredPassword,
                        photoUrl:
                            "https://scontent.fhan5-3.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=3YCurt1IZskAX8Cznbu&_nc_ht=scontent.fhan5-3.fna&oh=50a9e272c962f81c64b502c784a587bf&oe=616A7778",
                    });
                }
                return data;
            })
            .then((data) => {
                const expirationTime = new Date(
                    new Date().getTime() + +data.expiresIn * 1000
                );
                login(data.idToken, expirationTime);
            })
            .then(() => {
                history.replace("/");
            })
            .catch((error) => {
                setError(error.message);
                setShowModal(true);
            });
    };

    return (
        <React.Fragment>
            <ModalHelper
                showModal={showModal}
                error={error}
                closeModalHandler={closeModalHandler}
            />

            <Card customClass={classes.container}>
                <form
                    className={classes["form-group"]}
                    onSubmit={formSubmitHandler}
                >
                    <div className={classes.header}>
                        <h2>{loginMode ? "Login" : "Sign-up"}</h2>
                    </div>
                    <div className={emailClasses}>
                        <label htmlFor="email">Email</label>
                        <div>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email address..."
                                value={email}
                                onChange={emailChangeHandler}
                                onBlur={emailBlurHandler}
                            />
                            {emailHasError && (
                                <p>Please enter a valid email!</p>
                            )}
                        </div>
                    </div>
                    <div className={passwordClasses}>
                        <label htmlFor="password">Password</label>
                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password..."
                                value={password}
                                onChange={passwordChangeHandler}
                                onBlur={passwordBlurHandler}
                            />
                            {passwordHasError && (
                                <p>Please enter a valid password!</p>
                            )}
                        </div>
                    </div>
                    {isLoading && (
                        <div className={classes.loading}>
                            <LoadingSpinner />
                        </div>
                    )}
                    <div className={classes.actions}>
                        <button type="submit">
                            {loginMode ? "Login" : "Create"}
                        </button>
                        <button type="button" onClick={changeModeHandler}>
                            {loginMode
                                ? "Create new account"
                                : "Have an account"}
                        </button>
                    </div>
                </form>
            </Card>
        </React.Fragment>
    );
};

export default LoginForm;
