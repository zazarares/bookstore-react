import React from 'react';
import {Link} from "react-router-dom";
import useCartStorage from "../../../storage/order-stores/cart-storage";
import useUserStorage from "../../../storage/user-stores/user-storage";
import "../../../Styles/product-item.css"
import {deleteBook} from "../../../api-calls/filter-calls";

const ProductItem = ({book, displayAddToCartButton}) => {
    const cartStore = useCartStorage();
    const userStore = useUserStorage();
    const handleDelete = () => {
        deleteBook(book._id)
    }
    return (
        <div>
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
            <div className="card-footer">
                {displayAddToCartButton === false && (
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => {
                            console.log(book);
                            cartStore.addBook({book: book, quantity: 1});
                        }}
                    >
                        Add to Cart
                    </button>

                )}
                {userStore.user.isAdmin === true && displayAddToCartButton === false && (
                    <Link
                        className="btn btn-primary w-100 mt-3"
                        to={`/product/update/${book._id}`}
                    >
                        Update Book
                    </Link>

                )}
                {userStore.user.isAdmin === true && displayAddToCartButton === false && (
                    <button
                        className="btn btn-danger bg-danger w-100 mt-3"
                        onClick={handleDelete}
                    >
                        DELETE BOOK
                    </button>

                )}
            </div>
        </div>
    );
};

export default ProductItem;
