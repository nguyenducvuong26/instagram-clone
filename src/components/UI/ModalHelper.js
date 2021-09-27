import { Fragment } from "react";
import classes from "./ModalHelper.module.css";
import { Backdrop, Modal, animationTiming } from "./Modal";
import { CSSTransition } from "react-transition-group";

export default function ModalHelper({ showModal, error, closeModalHandler }) {
    return (
        <Fragment>
            {showModal && <Backdrop onClose={closeModalHandler} />}
            <CSSTransition
                in={showModal}
                timeout={animationTiming}
                unmountOnExit
                classNames={{
                    enter: "",
                    enterActive: classes.ModalOpen,
                    exit: "",
                    exitActive: classes.ModalClose,
                }}
            >
                <Modal
                    type={"Error"}
                    showModal={showModal}
                    message={error}
                    onClose={closeModalHandler}
                />
            </CSSTransition>
        </Fragment>
    );
}
