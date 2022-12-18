import classes from './Card.Module.css';

const Card = ({ children }) => {
    return (
        <div className={classes.card}>{children}</div>
    )
};

export default Card;