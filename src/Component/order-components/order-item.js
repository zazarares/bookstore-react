import React from 'react';
import OrderedBook from "./ordered-book";

const OrderItem = ({order}) => {

    return (
        <div className="card mb-3 h-100">
            <div className="row g-0 h-100">
                <div className="col-md-8">
                    <div className="card-body d-flex flex-column justify-content-center">
                        <h5 className="card-title">ID: {order._id}</h5>
                        <p className="card-text">User ID: {order.userId}</p>
                        <OrderedBook order={order.books}></OrderedBook>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end p-3">
                    <div>
                        <h6 className="fw-bold text-end">Total Price: {order.totalPrice} RON</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
