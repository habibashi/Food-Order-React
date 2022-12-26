import { useEffect, useState } from 'react';
import classes from './AvailableMeals.Module.css';
import Card from '../../UI/Card'
import MealItem from '../meal-items/MealItem';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState();
    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://react-meal-a79af-default-rtdb.firebaseio.com/meal.json');
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [])
    const mealsList = meals.map((item) =>
        <MealItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
        />
    );

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>

    )
};

export default AvailableMeals;