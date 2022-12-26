import { useContext, useState } from 'react';
import Modal from '../UI/modal/Modal';
import classes from './Cart.module.css';
import CartContaxt from '../../store/Cart-context'
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ onClose }) => {
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContaxt)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckOut(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-meal-a79af-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems =
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>;

    const modalAction = (
        <div className={classes.actions}>
            <button
                className={classes['button--alt']}
                onClick={onClose}>
                Close
            </button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total} >
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div >
            {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={onClose} />}
            {!isCheckOut && modalAction}
        </>
    )

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <>
            <p>Successfully send the oreder!</p>
            <div className={classes.actions}>
                <button
                    className={classes.button}
                    onClick={onClose}>
                    Close
                </button>
            </div>
        </>

    )
    return (
        <Modal onClose={onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
};

export default Cart;