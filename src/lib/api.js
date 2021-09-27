const FIREBASE_DOMAIN =
    "https://instagram-clone-12b86-default-rtdb.asia-southeast1.firebasedatabase.app";

// POSTS API

export async function getAllPost() {
    const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(response.Data.message);
    }

    const transformData = [];
    for (let key in responseData) {
        transformData.unshift({
            postId: key,
            ...responseData[key],
        });
    }
    return transformData;
}

export async function getSinglePost(postId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/posts/${postId}.json`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    const loadedPost = {
        postId: postId,
        ...responseData,
    };

    return loadedPost;
}

export async function uploadPost(postData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    const transformPost = {
        postId: responseData.name,
        ...postData,
    };

    return transformPost;
}

export async function removePost(postId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/posts/${postId}.json`, {
        method: "DELETE",
    });
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return postId;
}

// COMMENTS API

export async function getComments(postId) {
    const response = await fetch(
        `${FIREBASE_DOMAIN}/posts/${postId}/comments.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    let transformComments = [];

    for (let key in responseData) {
        transformComments.unshift({
            commentId: key,
            ...responseData[key],
        });
    }

    return transformComments;
}

export async function postComment(postData, postId) {
    const response = await fetch(
        `${FIREBASE_DOMAIN}/posts/${postId}/comments.json`,
        {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return {
        commentId: responseData.name,
        ...postData,
    };
}

export async function removeComment(postId, commentId) {
    const response = await fetch(
        `${FIREBASE_DOMAIN}/posts/${postId}/comments/${commentId}.json`,
        {
            method: "DELETE",
        }
    );
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return commentId;
}

// USER API

export async function addUser(userData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/users.json`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return {
        userId: responseData.name,
        ...userData,
    };
}

export async function getUsers() {
    const response = await fetch(`${FIREBASE_DOMAIN}/users.json`);

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to get users");
    }

    const transformUsers = [];

    for (let key in responseData) {
        transformUsers.push({
            userId: key,
            ...responseData[key],
        });
    }

    return transformUsers;
}

export async function updateUser(newUsername, userId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/users/${userId}.json`, {
        method: "PATCH",
        body: JSON.stringify(newUsername),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(response.message);
    }

    return;
}
