import React, {useEffect, useState} from 'react';
import CompletedOrderStorage from "../../storage/order-stores/completed-order-storage";

const CompletedOrder = () => {
    // Destructure the order details from the order prop
    const [books, setBooks] = useState([])
    const orderStore=CompletedOrderStorage();
    useEffect(() => {
        setBooks(orderStore.order.books);
    }, [orderStore.order.books]);
    return (
        <div className="order-display">
            <h2>Order Details</h2>
            <div className="order-summary">
                <p><strong>Order ID:</strong> {orderStore.order._id}</p>
                <p><strong>User ID:</strong> {orderStore.order.userId}</p>
                <p><strong>Date:</strong> {orderStore.order.date}</p>
                <p><strong>Total Price:</strong> {orderStore.order.totalPrice} RON</p>
            </div>
            <h3>Books in the Order</h3>
            <div className="books-list">
                {books.map((book, index) => (
                    <div key={index} className="book-item">
                        <p><strong>Name:</strong> {book.name}</p>
                        <p><strong>Price:</strong> {book.price} RON</p>
                        <p><strong>Quantity:</strong> {book.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompletedOrder;
