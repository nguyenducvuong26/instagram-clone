import { createSlice } from "@reduxjs/toolkit";

const initialPostSlice = {
    postList: [],
    detailPost: {
        postId: "",
        username: "",
        userAvatar: "",
        imageUrl: "",
        caption: "",
    },
    comments: [],
};

const postSlice = createSlice({
    name: "posts",
    initialState: initialPostSlice,
    reducers: {
        addPost: (state, action) => {
            state.postList.unshift(action.payload);
        },
        removePost: (state, action) => {
            state.postList = state.postList.filter(
                (post) => post.postId !== action.payload
            );
        },
        getAllPost: (state, action) => {
            state.postList = action.payload;
        },
        getDetailPost: (state, action) => {
            state.detailPost = action.payload;
        },
        getComments: (state, action) => {
            state.comments = action.payload;
        },
        addComment: (state, action) => {
            state.comments.unshift(action.payload);
        },
        removeComment: (state, action) => {
            state.comments = state.comments.filter(
                (comment) => comment.commentId !== action.payload
            );
        },
    },
});

export const postActions = postSlice.actions;

const postReducer = postSlice.reducer;

export default postReducer;
