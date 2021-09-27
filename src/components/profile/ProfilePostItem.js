import { Link } from "react-router-dom";
import classes from "./ProfilePostItem.module.css";

const ProfilePostItem = (props) => {
    return (
        <Link to={`/post/${props.postId}`}>
            <div className={classes.image}>
                <img src={props.imageUrl} alt="user-post" />
            </div>
        </Link>
    );
};

export default ProfilePostItem;
