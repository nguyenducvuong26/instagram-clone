import { useSelector } from "react-redux";
import classes from "./ProfileHeader.module.css";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProfileHeader = (props) => {
    const username = useSelector((state) => state.user.username);
    const photoUrl = useSelector((state) => state.user.photoUrl);

    return (
        <div className={classes.header}>
            <div className={classes.avatar}>
                <img src={photoUrl} alt="user-avatar" />
            </div>
            <div className={classes.info}>
                <div className={classes.user}>
                    {username && <span>{username}</span>}
                    <Link className={classes.button} to="/profile/edit">
                        Edit profile
                    </Link>
                    <Link to="/profile/edit">
                        <AiOutlineSetting />
                    </Link>
                </div>
                <div className={classes.post}>
                    <span>{props.userPosts && props.userPosts.length}</span>
                    &nbsp; &nbsp;
                    <span>posts</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
