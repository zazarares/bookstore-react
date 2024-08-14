import React from 'react';
import { Link } from "react-router-dom";

const ProductItem = ({ book }) => {

    return (
        <Link to={`/product/${book._id}`} className="text-decoration-none">
            <div className="card mb-3 h-100">
                <div className="row g-0 h-100">
                    <div className="col-md-4">
                        <img src={book.url} alt="Book Cover" className="img-fluid rounded-start ms-3 mt-3" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body d-flex flex-column justify-content-center">
                            <h5 className="card-title">{book.name}</h5>
                            <p className="card-text">Genre: {book.genre}</p>
                            <p className="card-text">Author: {book.author}</p>
                            <p className="card-text text-muted">Published: {book.year}</p>
                            <p className="card-text">Price: {book.price}</p>
                            <p className="card-text">Quantity: {book.quantity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
