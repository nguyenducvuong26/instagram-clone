import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    userId: "",
    username: "",
    photoUrl: "",
    email: "",
    users: [],
};

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        getUserInfor: (state, action) => {
            state.username = action.payload.username;
            state.photoUrl = action.payload.photoUrl;
            state.userId = action.payload.localId;
            state.email = action.payload.email;
        },
        getAllUsers: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
    },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
