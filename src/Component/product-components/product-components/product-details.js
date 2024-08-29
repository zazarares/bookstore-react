import React, {useEffect, useState} from 'react';
import '../../../Styles/product-details.css'
import useBookStorage from "../../../storage/book-stores/book-storage";
import {useParams} from 'react-router-dom';
import ProductItemMenu from "./product-item-menu";
import UserStorage from "../../../storage/user-stores/user-storage";

const ProductDetails = () => {
    const bookStore = useBookStorage();
    const {productId} = useParams();
    const [book, setBook] = useState()

    useEffect(() => {
        bookStore.getBook(productId).then((returnedBook) => {
            setBook(returnedBook);
        });
    }, [productId]);

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="container">
            <div className="back-button">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/205/875/small/backward-arrow-icon-free-vector.jpg"
                    alt="Back"
                    className="img-thumbnail"
                    onClick={handleBack}
                />
            </div>
            {bookStore.bookList.size && book ? (
                <div className="book-details">
                    <div className="card">
                        <div className="book-cover">
                            <img src={book.url} alt="Book Cover"
                                 className="img-fluid rounded-start"/>
                        </div>
                        <div className="book-info">
                            <h1 className="card-title">{bookStore.bookList.get(productId).name}</h1>
                            <p className="card-text"><strong>Author:</strong> {bookStore.bookList.get(productId).author}
                            </p>
                            <p className="card-text"><strong>Genre:</strong> {bookStore.bookList.get(productId).genre}
                            </p>
                            <p className="card-text"><strong>Year:</strong> {bookStore.bookList.get(productId).year}</p>
                            <p className="card-text">
                                <strong>Quantity:</strong> {bookStore.bookList.get(productId).quantity}
                            </p>
                            <p className="card-text">
                                <strong>Price:</strong> {bookStore.bookList.get(productId).price} RON
                            </p>
                            <ProductItemMenu book={bookStore.bookList.get(productId)} displayAddToCartButton={true}
                                             isUserAdmin={UserStorage.getState().user.isAdmin}></ProductItemMenu>
                        </div>
                    </div>
                </div>
            ) : (<div>No details available.</div>)}
        </div>
    );
};

export default ProductDetails;
