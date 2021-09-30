import { useState } from "react";
import classes from "./HomePage.module.css";
import PostList from "../components/posts/PostList";
import NewPostForm from "../components/posts/NewPostForm";
import SuggestionList from "../components/suggestions/SuggestionList";

function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

const HomePage = () => {
    const scrollbarWidth = getScrollbarWidth();

    const [padding, setPadding] = useState(
        (window.innerWidth - 935 - scrollbarWidth) / 2
    );

    window.onresize = () => {
        const newPadding = (window.innerWidth - 935 - scrollbarWidth) / 2;
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
