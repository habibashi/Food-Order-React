import AvailableMeals from './avilable-meals/AvailableMeals';
import MealsSummary from './meals-summary/MealsSummary';

const Meals = (props) => {
    return (
        <>
            <MealsSummary />
            <AvailableMeals />
        </>
    )
};

export default Meals;