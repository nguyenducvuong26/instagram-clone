import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { postActions } from "../../store/posts";
import useHttp from "../../hooks/useHttp";
import { uploadPost } from "../../lib/api";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import firebaseApp from "../../firebase";
import classes from "./NewPostForm.module.css";
import Card from "../UI/Card";
import ModalHelper from "../UI/ModalHelper";

const NewPostForm = () => {
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [caption, setCaption] = useState("");
    const [imageAsFile, setImageAsFile] = useState("");
    const [inputKey, setInputKey] = useState("");
    const photoUrl = useSelector((state) => state.user.photoUrl);
    const userId = useSelector((state) => state.user.userId);
    const username = useSelector((state) => state.user.username);
    const { sendRequest } = useHttp(uploadPost, postActions.addPost);

    const imageAsFileHandler = (e) => {
        const image = e.target.files[0];
        setImageAsFile(image);
    };

    const captionChangeHandler = (e) => {
        setCaption(e.target.value);
    };

    const closeModalHandler = () => {
        setShowModal(false);
        setError(null);
    };

    let formIsValid = false;
    if (imageAsFile && caption) {
        formIsValid = true;
    }

    const firebaseUploadHandler = (e) => {
        e.preventDefault();
        setInputKey(Math.random().toString());

        if (formIsValid && !username) {
            setError("Please update your username before posting!");
            setShowModal(true);
            return;
        }

        if (!formIsValid) {
            return;
        }

        const storage = getStorage(firebaseApp);

        const metadata = {
            contentType: "image/jpeg",
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "images/" + imageAsFile.name);
        const uploadTask = uploadBytesResumable(
            storageRef,
            imageAsFile,
            metadata
        );

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        break;
                    case "storage/canceled":
                        // User canceled the upload
                        break;

                    // ...

                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at: ", downloadURL);
                    sendRequest({
                        userId,
                        username,
                        userAvatar: photoUrl,
                        imageUrl: downloadURL,
                        caption,
                    });
                });
            }
        );
    };

    return (
        <Fragment>
            <ModalHelper
                showModal={showModal}
                error={error}
                closeModalHandler={closeModalHandler}
            />
            <Card>
                <form onSubmit={firebaseUploadHandler}>
                    <div className={classes.container}>
                        <div className={classes.avatar}>
                            <img src={photoUrl} alt="user-avatar" />
                        </div>
                        <div className={classes.form}>
                            <input
                                type="text"
                                placeholder="What's on your mind?"
                                // when update key value will rerender the input to delete the current value;
                                key={inputKey}
                                onChange={captionChangeHandler}
                            />
                        </div>
                    </div>
                    <div className={classes.upload}>
                        <input
                            type="file"
                            key={inputKey}
                            onChange={imageAsFileHandler}
                            accept="image/jpeg"
                        />
                        <button>Post</button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default NewPostForm;
