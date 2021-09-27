import classes from "./DetailPage.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { postActions } from "../store/posts";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import { getSinglePost } from "../lib/api";
import { getComments } from "../lib/api";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import PostDetail from "../components/posts/PostDetail";
import NewCommentForm from "../components/comments/NewCommentForm";
import CommentList from "../components/comments/CommentList";

const DetailPage = () => {
    const detailPost = useSelector((state) => state.posts.detailPost);
    const { postId } = useParams();
    const {
        sendRequest: fetchDetailPost,
        isLoading,
        error,
    } = useHttp(getSinglePost, postActions.getDetailPost);

    const { sendRequest: fetchComments } = useHttp(
        getComments,
        postActions.getComments
    );

    useEffect(() => {
        fetchDetailPost(postId);
    }, [fetchDetailPost, postId]);

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

    if (!isLoading && !error && !detailPost.caption) {
        return (
            <div className="center">
                <h2>No post found.</h2>
            </div>
        );
    }

    return (
        <Card customClass={classes.wrapper}>
            <PostDetail
                postId={detailPost.postId}
                userAvatar={detailPost.userAvatar}
                username={detailPost.username}
                caption={detailPost.caption}
                imageUrl={detailPost.imageUrl}
            />
            <CommentList
                onGetComments={fetchComments}
                postId={detailPost.postId}
            />
            <NewCommentForm postId={postId} />
        </Card>
    );
};
export default DetailPage;
