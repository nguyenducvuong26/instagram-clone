import { Fragment, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { AuthContext } from "../../contexts/auth-context";
import { userActions } from "../../store/user";
import useHttp from "../../hooks/useHttp";
import { updateUser } from "../../lib/api";
import useInput from "../../hooks/useInput";
import classes from "./ProfileForm.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import ModalHelper from "../UI/ModalHelper";

const validateUsername = (value, extraData) => {
    let returnValue = value.trim().length > 0;
    if (!returnValue) {
        return returnValue;
    }
    if (returnValue) {
        const result = extraData.some((data) => {
            return data.username === value;
        });
        if (result) {
            returnValue = false;
        }
        return returnValue;
    }
};

const validateFileImage = () => {
    return true;
};

const ProfileForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { token } = useContext(AuthContext);
    const photoUrl = useSelector((state) => state.user.photoUrl);
    const email = useSelector((state) => state.user.email);
    const users = useSelector((state) => state.user.users);
    const user = users.find((user) => user.email === email);
    const dispatch = useDispatch();
    const history = useHistory();

    const { sendRequest: updateUsername } = useHttp(updateUser);

    const closeModalHandler = () => {
        setShowModal(false);
        setError(null);
    };

    const {
        value: inputUsername,
        isValid: usernameIsValid,
        hasError: usernameHasError,
        inputChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        reset: resetUsername,
    } = useInput(validateUsername, users);

    const {
        value: avatar,
        isValid: avatarIsValid,
        inputChangeHandler: avatarChangeHandler,
        reset: resetFileImage,
    } = useInput(validateFileImage);

    const usenameClasses = usernameHasError
        ? `${classes["form-control"]} ${classes.invalid}`
        : classes["form-control"];

    let formIsValid = false;

    if (usernameIsValid && avatarIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const enteredUsername = inputUsername;
        const enteredAvatar = avatar;
        if (!formIsValid) {
            usernameBlurHandler();
            return;
        }
        setIsLoading(true);
        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCy3DlecRc2J-D1JH_4vF-B1ssMgnulLg4",
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                    displayName: enteredUsername,
                    photoUrl: enteredAvatar ? enteredAvatar : photoUrl,
                    returnSecureToken: true,
                }),
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                setIsLoading(false);
                resetUsername();
                resetFileImage();
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((data) => {
                        let errorMessage = "Failed to update!";
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((responseData) => {
                updateUsername(
                    {
                        username: inputUsername,
                        photoUrl: enteredAvatar ? enteredAvatar : photoUrl,
                    },
                    user.userId
                );
                return responseData;
            })
            .then((responseData) => {
                dispatch(
                    userActions.getUserInfor({
                        username: responseData.displayName,
                        photoUrl: responseData.photoUrl,
                        localId: responseData.localId,
                        email: responseData.email,
                    })
                );
            })
            .then((data) => {
                history.push("/profile");
            })
            .catch((error) => {
                setError(error.message);
                setShowModal(true);
            });
    };

    return (
        <Fragment>
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
                        <h2>Profile</h2>
                    </div>
                    <div className={usenameClasses}>
                        <label htmlFor="username">Username</label>
                        <div>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username..."
                                value={inputUsername}
                                onChange={usernameChangeHandler}
                                onBlur={usernameBlurHandler}
                            />
                            {usernameHasError && (
                                <p>Please enter a valid username!</p>
                            )}
                        </div>
                    </div>
                    <div className={classes["form-control"]}>
                        <label htmlFor="avatar">Avatar</label>
                        <div>
                            <input
                                type="text"
                                id="avatar"
                                placeholder="Enter your photo URL... (Optional)"
                                value={avatar}
                                onChange={avatarChangeHandler}
                            />
                        </div>
                    </div>
                    {isLoading && (
                        <div className={classes.loading}>
                            <LoadingSpinner />
                        </div>
                    )}
                    <div className={classes.actions}>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default ProfileForm;
