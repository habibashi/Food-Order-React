import mealsImage from '../../assets/meals.jpg';
import classes from './Header.Module.css';
import HeaderCartButton from './Header-Button/HeadrCartButton';

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} />
            </div>
        </>
    )
};

export default Header;