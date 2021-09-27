import classes from "./UserItem.module.css";

const UserItem = (props) => {
    return (
        <li className={classes.item}>
            <div className={classes.image}>
                <img src={props.user.photoUrl} alt="user-avatar" />
            </div>
            <div className={classes.username}>
                <h3>{props.user.username}</h3>
            </div>
            <div className={classes.action}>
                <button>Follow</button>
            </div>
        </li>
    );
};

export default UserItem;
