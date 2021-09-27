import { Fragment } from "react";
import classes from "./PostDetail.module.css";

const PostDetail = (props) => {
    return (
        <Fragment>
            <div className={classes.header}>
                <div className={classes.info}>
                    <img src={props.userAvatar} alt="user-avatar" />
                    <span>{props.username}</span>
                </div>
            </div>
            <div className={classes.image}>
                <img alt="user-post" src={props.imageUrl} />
            </div>
            <div className={classes.caption}>
                <span>{props.username}</span>
                <span>{props.caption}</span>
            </div>
        </Fragment>
    );
};

export default PostDetail;
