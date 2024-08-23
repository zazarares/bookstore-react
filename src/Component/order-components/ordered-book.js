// OrderedBook.js
import React from 'react';

const OrderedBook = ({orderedBook}) => {
    return (
        orderedBook ? (
            orderedBook.book ? (
                    <div className="d-flex flex-column mb-3 border p-3 rounded">
                        <div className="d-flex justify-content-center mb-1">
                            <img src={orderedBook.book.url} alt="order" className="mb-1 small-image"/>
                        </div>
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
