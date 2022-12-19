import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './meals-Item-Form/MealsItemForm';
import CartContext from '../../../store/Cart-context';

const MealItem = ({ name, description, price, id }) => {
    const cartCtx = useContext(CartContext);
    const prices = `$${price.toFixed(2)}`;
    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price
        });
    };
    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{prices}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
};

export default MealItem;