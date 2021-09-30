import { useEffect } from "react";
import { useSelector } from "react-redux";
import { postActions } from "../../store/posts";
import useHttp from "../../hooks/useHttp";
import { getAllPost } from "../../lib/api";
import { removePost } from "../../lib/api";
import classes from "./PostList.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import PostItem from "./PostItem";

const PostList = () => {
    const posts = useSelector((state) => state.posts.postList);
    const {
        sendRequest: fetchPosts,
        isLoading,
        error,
    } = useHttp(getAllPost, postActions.getAllPost);

    const { sendRequest: removePostRequest } = useHttp(
        removePost,
        postActions.removePost
    );

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [posts]);

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isLoading && error) {
        return (
            <div className="center">
                <h2>{error}</h2>
            </div>
        );
    }

    if (!isLoading && !error && posts && posts.length === 0) {
        return (
            <div className="center">
                <h2>No post found.</h2>
            </div>
        );
    }

    if (!isLoading && !error && posts && posts.length > 0) {
        return (
            <ul className={classes["post-list"]}>
                {posts &&
                    posts.map((post) => {
                        return (
                            <PostItem
                                key={post.postId}
                                postId={post.postId}
                                username={post.username}
                                userAvatar={post.userAvatar}
                                caption={post.caption}
                                imageUrl={post.imageUrl}
                                onRemovePost={removePostRequest}
                            />
                        );
                    })}
            </ul>
        );
    }
};

export default PostList;
