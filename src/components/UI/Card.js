import classes from "./Card.module.css";

const Card = (props) => {
    const customClasses = props.customClass
        ? `${classes.card} ${props.customClass}`
        : classes.card;
    return <div className={customClasses}>{props.children}</div>;
};

export default Card;
