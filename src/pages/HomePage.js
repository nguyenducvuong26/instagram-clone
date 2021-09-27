import { useState } from "react";
import classes from "./HomePage.module.css";
import PostList from "../components/posts/PostList";
import NewPostForm from "../components/posts/NewPostForm";
import SuggestionList from "../components/suggestions/SuggestionList";

const HomePage = () => {
    const [padding, setPadding] = useState((window.innerWidth - 935) / 2);

    window.onresize = () => {
        const newPadding = (window.innerWidth - 935) / 2;
        setPadding(newPadding);
    };

    return (
        <div className={classes.container}>
            <div className={classes["main-content"]}>
                <NewPostForm />
                <PostList />
            </div>
            <div
                className={classes["sub-content"]}
                style={{ marginRight: `${padding}px` }}
            >
                <SuggestionList />
            </div>
        </div>
    );
};

export default HomePage;
