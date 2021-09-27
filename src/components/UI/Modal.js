import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Card from "./Card";

export const animationTiming = {
    enter: 600,
    exit: 600,
};

export const Backdrop = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <div onClick={props.onClose} className={classes.backdrop} />,
                document.getElementById("backdrop")
            )}
            ;
        </Fragment>
    );
};

export const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Card customClass={classes.modal}>
                    <div className={classes.header}>
                        <h2>{props.type}</h2>
                    </div>
                    <div className={classes.content}>
                        <p>{props.message}</p>
                    </div>
                    <footer className={classes.actions}>
                        <button onClick={props.onClose}>OK</button>
                    </footer>
                </Card>,
                document.getElementById("modal")
            )}
        </Fragment>
    );
};

/* <CSSTransition
            in={props.showModal}
            timeout={animationTiming}
            unmountOnExit
            classNames={{
                enter: "",
                enterActive: classes.ModalOpen,
                exit: "",
                exitActive: classes.ModalClose,
            }}
        ></CSSTransition> */
