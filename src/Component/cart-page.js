import React, {useEffect, useState} from 'react';
import CartList from "./order-components/cart-list";
import useCartStorage from "../storage/order-stores/cart-storage";
import {useNavigate} from "react-router-dom";
import "../Styles/cart-page.css"
import useUserStorage from "../storage/user-stores/user-storage";
import EmptyCart from "./order-components/empty-cart";
import useCompletedOrderStorage from "../storage/order-stores/completed-order-storage";
import {sendOrder} from "../api-calls/order-calls";

const CartPage = () => {
    const [order, setOrder] = useState({})
    const cartStore = useCartStorage();
    const userStore = useUserStorage();
    const completedOrderStore = useCompletedOrderStorage();
    const navigate = useNavigate();
    useEffect(() => {
        if (order._id) {
            navigate(`/order/${order._id}`);
            completedOrderStore.addNewOrder(order)
        }
    }, [order._id]);

    const executeOrder = async () => {
        try {
            const orderResponse = await sendOrder(userStore.user._id, cartStore.bookList, userStore.logOut);
            setOrder(orderResponse.order);
            return orderResponse;
        } catch (error) {
            console.error('Error executing order:', error);
        }
    }

    const finishOrder = () => {
        if (userStore.isLoggedIn) {
            executeOrder()
            cartStore.clear();
            setOrder({...order, _id: null});
        } else {
            navigate("/login")
        }
    }

    if (!cartStore.empty()) {
        return (
            <div>
                <CartList></CartList>
                <p>Total Price:{cartStore.price}</p>
                <button onClick={finishOrder}>Finish Order</button>
            </div>
        );
    } else {
        return (
            <EmptyCart/>
        );
    }
};

export default CartPage;
