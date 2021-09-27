import { useEffect } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import { removeComment } from "../../lib/api";
import { postActions } from "../../store/posts";
import classes from "./CommentList.module.css";
import CommentItem from "./CommentItem";

const CommentList = (props) => {
    const detailPost = useSelector((state) => state.posts.detailPost);
    const comments = useSelector((state) => state.posts.comments);
    const { onGetComments } = props;

    const { sendRequest } = useHttp(removeComment, postActions.removeComment);

    useEffect(() => {
        onGetComments(detailPost.postId);
    }, [onGetComments, detailPost.postId]);

    return (
        <ul className={classes.comments}>
            {comments.map((comment) => {
                return (
                    <CommentItem
                        key={comment.commentId}
                        commentId={comment.commentId}
                        username={comment.username}
                        content={comment.content}
                        postOwner={detailPost.username}
                        onRemoveComment={sendRequest}
                        postId={props.postId}
                    />
                );
            })}
        </ul>
    );
};

export default CommentList;
