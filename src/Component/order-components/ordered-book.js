// OrderedBook.js
import React from 'react';

const OrderedBook = ({orderedBook}) => {
    return (
        orderedBook ? (
            orderedBook.book ? (
                    <div className="d-flex flex-column mb-3 border p-3 rounded">
                        <h6 className="fw-bold">{orderedBook.book.name}</h6>
                        <p className="mb-1">Price: {orderedBook.book.price} RON</p>
                        <p className="mb-1">Quantity: {orderedBook.quantity}</p>
                    </div>
                )
                :
                (
                    <div className="d-flex flex-column mb-3 border p-3 rounded">Book was removed from the
                        database!</div>
                )
        ) : (<div className="d-flex flex-column mb-3 border p-3 rounded">no details</div>)
    );
};
export default OrderedBook;
