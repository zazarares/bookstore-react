import React, {useEffect, useState} from "react";
import OrderItem from "./order-components/order-item";
import UserStorage from "../storage/user-stores/user-storage";
import "../Styles/user.css"
import completedOrderStorage from "../storage/order-stores/completed-order-storage";
import {fetchBookDetails, matchBooksAndOrders} from "../utils";
import bookStorage from "../storage/book-stores/book-storage";
import LoadingPage from "./loading-page";

const OrdersPage = () => {

    const userStore = UserStorage();
    const orderStore = completedOrderStorage()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        orderStore.cacheOrders(userStore.user._id)
    }, [])

    useEffect(() => {
        fetchBookDetails(orderStore.orderList).then((bookList) => {
            bookStorage.getState().addBooks(bookList);
            return matchBooksAndOrders(Array.from(bookStorage.getState().bookList.values()), orderStore.orderList)
        }).then((DetailedOrders) => {
            setOrders(DetailedOrders)
        });
    }, [orderStore.orderList]);


    return (
        <div className="mt-5 row justify-content-center align-items-center">
            {orders.length > 0 ? (orders.map((order, index) => (
                <div className="col-xl-8 col-lg-10 col-md-12 mb-4" key={index}>
                    <OrderItem order={order}/>
                </div>
            ))) : (<LoadingPage/>)}
        </div>)
}
export default OrdersPage;