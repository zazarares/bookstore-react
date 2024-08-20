import React, {useEffect, useState} from 'react';
import '../../../Styles/product-details.css'
import {fetchBookById} from "../../../api-calls";
import CartStorage from "../../../storage/order-stores/cart-storage";
import useBookStorage from "../../../storage/book-stores/book-storage";
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const [book, setBook] = useState({});
    const cartStore = CartStorage();
    const bookStore = useBookStorage();
    const { productId } = useParams();

    useEffect(() => {
        setBook(bookStore.getBook(productId));
    }, [bookStore, productId])

    const handleBack = () => {
        window.history.back();
    };

    const addToCart = () => {
        cartStore.addBook({book: book, quantity: 1})
    }

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

            <div className="book-details">
                <div className="card">
                    <div className="book-cover">
                        <img src={book.url} alt="Book Cover" className="img-fluid rounded-start"/>
                    </div>
                    <div className="book-info">
                        <h1 className="card-title">{book.name}</h1>
                        <p className="card-text"><strong>Author:</strong> {book.author}</p>
                        <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
                        <p className="card-text"><strong>Year:</strong> {book.year}</p>
                        <p className="card-text"><strong>Price:</strong> {book.price} RON</p>
                        <button className="btn" onClick={addToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
