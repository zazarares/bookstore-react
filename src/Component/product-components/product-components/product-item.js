import React from 'react';
import {Link} from "react-router-dom";
import useUserStorage from "../../../storage/user-stores/user-storage";
import "../../../Styles/product-item.css"
import ProductItemMenu from "./product-item-menu";

const ProductItem = ({book, displayAddToCartButton}) => {
    const userStorage = useUserStorage();
    return (<div>
        <Link to={`/product/${book._id}`} className="text-decoration-none">
            <div className="card product-card light-card">
                <div className="row g-0 h-100">
                    <div className="col-md-4">
                        <img
                            src={book.url}
                            alt="Book Cover"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-between">
                        <div className="card-body">
                            <h5 className="card-title">{book.name}</h5>
                            <p className="card-text">Genre: {book.genre}</p>
                            <p className="card-text">Author: {book.author}</p>
                            <p className="card-text text-muted">Published: {book.year}</p>
                            <p className="card-text">Price: ${book.price}</p>
                            <p className="card-text">Quantity: {book.quantity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        <ProductItemMenu book={book} displayAddToCartButton={displayAddToCartButton}
                         isUserAdmin={userStorage.user.isAdmin}></ProductItemMenu>
    </div>);
};

export default ProductItem;
