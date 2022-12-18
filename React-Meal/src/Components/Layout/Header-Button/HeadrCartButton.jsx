import classes from './HeaderCartButton.Module.css';
import CartIcon from '../../Cart/CartIcon';
const HeaderCartButton = ({ onClick }) => {
    return (
        <button className={classes.button} onClick={onClick} >
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Card</span>
            <span className={classes.badge}>
                3
            </span>
        </button>
    )
};

export default HeaderCartButton;