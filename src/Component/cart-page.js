import React from 'react';
import CartList from "./order-components/cart-list";
import CartStorage from "../storage/order-stores/cart-storage";
import {sendOrder, updateQuantities} from "../api-calls";
import {useNavigate} from "react-router-dom";
import "../Styles/cart-page.css"
import UserStorage from "../storage/user-stores/user-storage";
import EmptyCart from "./order-components/empty-cart";
import CompletedOrderStorage from "../storage/order-stores/completed-order-storage";

const CartPage = () => {
    const cartStore = CartStorage();
    const userStore = UserStorage();
    const orderStore = CompletedOrderStorage();
    const navigate = useNavigate();

    const executeOrder = async () => {
        try {
            const orderResponse = await sendOrder(userStore.id, cartStore.bookList, userStore.jwt, userStore.logOut);
            orderStore.setOrder(orderResponse.order);
            await updateQuantities(cartStore.bookList, userStore.jwt, userStore.logOut);

        } catch (error) {
            console.error('Error executing order:', error);
        }
    }

    const finishOrder = () => {
        if (userStore.jwt !== "" && userStore.username !== "") {
            executeOrder();
            cartStore.clear();
            navigate("/order/a")

        }
        else {
            navigate("/login")
        }
    }

    if (!cartStore.empty()) {
        return (
            <div>
                <CartList></CartList>
                <p1>Total Price:{cartStore.price}</p1>
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
