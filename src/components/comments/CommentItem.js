import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../../store/posts";
import classes from "./CommentItem.module.css";
import { BsThreeDots } from "react-icons/bs";

const CommentItem = (props) => {
    const [commentSettingIsShown, setCommentSettingIsShown] = useState(false);
    const username = useSelector((state) => state.user.username);
    const dispatch = useDispatch();

    const showCommentSettingHandler = () => {
        setCommentSettingIsShown((prevState) => !prevState);
    };

    const hideCommentHandler = () => {
        dispatch(postActions.removeComment(props.commentId));
    };

    const removeCommentHandler = () => {
        props.onRemoveComment(props.postId, props.commentId);
    };

    return (
        <li className={classes.comment}>
            <div>
                <span className={classes.username}>{props.username}</span>
                <span>{props.content}</span>
            </div>
            {username === props.username || username === props.postOwner ? (
                <div
                    className={classes["comment-setting"]}
                    onClick={showCommentSettingHandler}
                >
                    <BsThreeDots />
                    {commentSettingIsShown && (
                        <ul className={classes["comment-setting-list"]}>
                            <li onClick={hideCommentHandler}>Hide</li>
                            {props.username === username ||
                            props.postOwner === username ? (
                                <li onClick={removeCommentHandler}>Remove</li>
                            ) : null}
                        </ul>
                    )}
                </div>
            ) : null}
        </li>
    );
};

export default CommentItem;
