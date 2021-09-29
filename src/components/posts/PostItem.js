import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postActions } from "../../store/posts";
import classes from "./PostItem.module.css";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Card from "../UI/Card";

const PostItem = (props) => {
    const [postSettingIsShown, setPostSettingIsShown] = useState(false);
    const username = useSelector((state) => state.user.username);

    const dispatch = useDispatch();

    const showPostSettingHandler = () => {
        setPostSettingIsShown((prevState) => !prevState);
    };

    const hidePostHandler = () => {
        dispatch(postActions.removePost(props.postId));
    };

    const removePostHandler = () => {
        props.onRemovePost(props.postId);
    };

    return (
        <li>
            <Card>
                <div className={classes.header}>
                    <div className={classes.info}>
                        <img src={props.userAvatar} alt="user-avatar" />
                        <span>{props.username}</span>
                    </div>
                    <div
                        className={classes.setting}
                        onClick={showPostSettingHandler}
                    >
                        <BsThreeDots />
                        {postSettingIsShown && (
                            <ul className={classes["setting-list"]}>
                                <li onClick={hidePostHandler}>Hide</li>
                                {props.username === username ? (
                                    <li onClick={removePostHandler}>Remove</li>
                                ) : null}
                            </ul>
                        )}
                    </div>
                </div>
                <div className={classes.image}>
                    <img
                        alt={`${props.username}-post`}
                        src={props.imageUrl}
                        loading="lazy"
                    />
                </div>
                <div className={classes.caption}>
                    <span>{props.username}</span>
                    <span>{props.caption}</span>
                </div>
                <Link to={`/post/${props.postId}`} className={classes.comment}>
                    View Comments
                </Link>
            </Card>
        </li>
    );
};

export default PostItem;
