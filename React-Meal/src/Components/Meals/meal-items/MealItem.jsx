import classes from './MealItem.module.css';
import MealItemForm from './meals-Item-Form/MealsItemForm';
const MealItem = ({ name, description, price }) => {
    const prices = `$${price.toFixed(2)}`;
    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{prices}</div>
            </div>
            <div>
                <MealItemForm />
            </div>
        </li>
    )
};

export default MealItem;