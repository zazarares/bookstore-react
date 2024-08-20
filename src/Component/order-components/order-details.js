import React, {useEffect, useState} from 'react';
import useCompletedOrderStorage from "../../storage/order-stores/completed-order-storage";
import {Link, useParams} from "react-router-dom";
import "../../Styles/order-details.css"

const OrderDetails = () => {
    const [books, setBooks] = useState([])
    const [order, setOrder] = useState({});
    const orderStore = useCompletedOrderStorage();
    const {orderID} = useParams();

    useEffect(() => {
        const currOrder = orderStore.getOrder(orderID);
        setOrder(currOrder)
        setBooks(currOrder.books)
    }, [orderStore, orderID]);

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
                {books ? (
                    books.map((book) => (
                        <div key={book.book} className="book-item">
                            <Link to={`/product/${book.book}`} className="text-decoration-none">
                                <p><strong>Name:</strong> {book.name}</p>
                                <p><strong>Price:</strong> {book.price} RON</p>
                                <p><strong>Quantity:</strong> {book.quantity}</p>
                            </Link>
                        </div>
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
