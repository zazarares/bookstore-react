import React, {useEffect, useState} from 'react';
import useCompletedOrderStorage from "../../storage/order-stores/completed-order-storage";
import {Link, useParams} from "react-router-dom";
import "../../Styles/order-details.css"
import {fetchBookDetails, matchBooksAndOrders} from "../../utils";
import bookStorage from "../../storage/book-stores/book-storage";
import LoadingPage from "../loading-page";

const OrderDetails = () => {
    const [orderContent, setOrderContent] = useState([])
    const [order, setOrder] = useState({});
    const orderStore = useCompletedOrderStorage();
    const {orderID} = useParams();

    useEffect(() => {
        const getOrder = async () => {
            const currOrder = await orderStore.getOrder(orderID);
            if (currOrder) {
                fetchBookDetails(currOrder).then((bookList) => {
                    bookStorage.getState().addBooks(bookList);
                    return matchBooksAndOrders(Array.from(bookStorage.getState().bookList.values()), [currOrder])
                }).then((DetailedOrders) => {
                    setOrder(DetailedOrders[0])
                    setOrderContent(DetailedOrders[0].books)
                });
            }
        }
        getOrder();

    }, []);

    return (
        <div>
            {
                order._id ? (
                    <div className="order-display">
                        <h2>Order Details</h2>
                        <div className="order-summary">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>User ID:</strong> {order.userId}</p>
                            <p><strong>Date:</strong> {order.date}</p>
                            <p><strong>Total Price:</strong> {order.totalPrice} RON</p>
                        </div>
                        <h3>Books in the Order</h3>
                        <div className="books-list">
                            {orderContent ? (
                                orderContent.map((data) => (
                                    data.book ? (
                                        <div key={data.book._id} className="book-item">
                                            <Link to={`/product/${data.book._id}`} className="text-decoration-none">
                                                <div className="d-flex justify-content-center mb-1">
                                                    <img src={data.book.url} alt="order" className="mb-1 small-image"/>
                                                </div>
                                                <p><strong>Name:</strong> {data.book.name}</p>
                                                <p><strong>Price:</strong> {data.book.price} RON</p>
                                                <p><strong>Quantity:</strong> {data.quantity}</p>


                                            </Link>
                                        </div>) : (<div>Book was removed from the database!</div>)
                                ))
                            ) : (
                                <p>No books available.</p>
                            )}
                        </div>
                    </div>) : (<LoadingPage/>)
            }
        </div>
    )
        ;
};

export default OrderDetails;
