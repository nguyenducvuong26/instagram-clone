import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./ProfilePage.module.css";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfilePostList from "../components/profile/ProfilePostList";

const ProfilePage = () => {
    const [posts, setPosts] = useState(null);
    const username = useSelector((state) => state.user.username);
    let userPosts;
    if (posts) {
        userPosts = posts.filter((post) => post.username === username);
    }

    useEffect(() => {
        const posts = JSON.parse(localStorage.getItem("posts"));
        setPosts(posts);
    }, []);

    return (
        <div className={classes.wrapper}>
            <ProfileHeader userPosts={userPosts} />
            <ProfilePostList userPosts={userPosts} />
        </div>
    );
};

export default ProfilePage;
