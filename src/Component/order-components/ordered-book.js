// OrderedBook.js
import React from 'react';

const OrderedBook = ({ order }) => {
    if (order.length === 0) {
        return <p>No books available</p>;
    }

    return order.map((book,index) => (
        <div key={index} className="d-flex flex-column mb-3 border p-3 rounded">
            <h6 className="fw-bold">{book.name}</h6>
            <p className="mb-1">Price: {book.price} RON</p>
            <p className="mb-1">Quantity: {book.quantity}</p>
        </div>
    ));
};
export default OrderedBook;
