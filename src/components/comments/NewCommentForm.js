import classes from "./NewCommentForm.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { postActions } from "../../store/posts";
import useHttp from "../../hooks/useHttp";
import { postComment } from "../../lib/api";

const NewCommentForm = (props) => {
    const [comment, setComment] = useState("");
    const username = useSelector((state) => state.user.username);

    const { sendRequest } = useHttp(postComment, postActions.addComment);

    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    };

    let formIsValid = false;
    if (comment) {
        formIsValid = true;
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!formIsValid) {
            return;
        }

        if (!username) {
            alert("Please update your username before adding comment!");
            return;
        }
        const enteredComment = comment;
        sendRequest(
            {
                username,
                content: enteredComment,
            },
            props.postId
        );
        setComment("");
    };

    const buttonClass = formIsValid
        ? classes.button
        : `${classes.button} ${classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <input
                type="text"
                autoFocus={true}
                value={comment}
                onChange={commentChangeHandler}
            />
            <button className={buttonClass} type="submit">
                Post
            </button>
        </form>
    );
};

export default NewCommentForm;
