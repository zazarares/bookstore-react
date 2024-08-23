import React, {useEffect, useState} from 'react';
import useCompletedOrderStorage from "../../storage/order-stores/completed-order-storage";
import {Link, useParams} from "react-router-dom";
import "../../Styles/order-details.css"

const OrderDetails = () => {
    const [orderContent, setOrderContent] = useState([])
    const [order, setOrder] = useState({});
    const orderStore = useCompletedOrderStorage();
    const {orderID} = useParams();

    useEffect(() => {
        const currOrder = orderStore.getOrder(orderID);
        if (currOrder) {
            setOrder(currOrder)
            setOrderContent(currOrder.books)
        }
    }, [orderStore.detailedOrderList]);

    return (
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
                            <div key={data.book} className="book-item">
                                <Link to={`/product/${data.book_id}`} className="text-decoration-none">
                                    <div className="d-flex justify-content-center mb-1">
                                        <img src={data.book.url} alt="order" className="mb-1 small-image"/>
                                    </div>
                                    <p><strong>Name:</strong> {data.book.name}</p>
                                    <p><strong>Price:</strong> {data.book.price} RON</p>
                                    <p><strong>Quantity:</strong> {data.book.quantity}</p>


                                </Link>
                            </div>) : (<div>Book was removed from the database!</div>)
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </div>
        </div>
    )
        ;
};

export default OrderDetails;
