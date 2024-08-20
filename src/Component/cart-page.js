import React, {useEffect, useState} from 'react';
import CartList from "./order-components/cart-list";
import useCartStorage from "../storage/order-stores/cart-storage";
import {sendOrder} from "../api-calls";
import {useNavigate} from "react-router-dom";
import "../Styles/cart-page.css"
import useUserStorage from "../storage/user-stores/user-storage";
import EmptyCart from "./order-components/empty-cart";

const CartPage = () => {
    const [order, setOrder] = useState({})
    const cartStore = useCartStorage();
    const userStore = useUserStorage();
    const navigate = useNavigate();
    useEffect(() => {
        if(order._id)
            navigate(`/order/${order._id}`);
    }, [order]);

    const executeOrder = async () => {
        try {
            const orderResponse = await sendOrder(userStore.user._id, cartStore.bookList, userStore.logOut);
            setOrder(orderResponse.order);
        } catch (error) {
            console.error('Error executing order:', error);
        }
    }

    const finishOrder = () => {
        if (userStore.logged) {
            executeOrder();
            cartStore.clear();
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
