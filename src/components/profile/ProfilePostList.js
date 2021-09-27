import classes from "./ProfilePostList.module.css";
import "../../grid.css";
import ProfilePostItem from "./ProfilePostItem";
import { Link } from "react-router-dom";

const ProfilePostList = (props) => {
    return (
        <div className={classes.container}>
            <div className="grid wide">
                <div className="row">
                    {props.userPosts &&
                        props.userPosts.length > 0 &&
                        props.userPosts.map((post) => {
                            return (
                                <div
                                    className="col l-4 c-4 m-4 "
                                    key={post.postId}
                                >
                                    <ProfilePostItem
                                        imageUrl={post.imageUrl}
                                        postId={post.postId}
                                    />
                                </div>
                            );
                        })}
                    {!props.userPosts && (
                        <div className="center">
                            <Link to="/">Upload new post </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePostList;
