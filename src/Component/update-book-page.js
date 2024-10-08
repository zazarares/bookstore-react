import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchBookById, updateBook} from "../api-calls/book-calls";
import {Store} from "react-notifications-component";
import "../Styles/update-book.css"

function UpdateBookForm() {
    const {productId} = useParams();
    const [book, setBook] = useState({
        _id: '',
        name: '',
        author: '',
        year: '',
        genre: '',
        price: '',
        quantity: '',
        url: ''
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const fetchedBook = await fetchBookById(productId);
                setBook(fetchedBook.book[0]);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };
        fetchBook();
    }, [productId]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBook({
            ...book,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook(productId, book);
            Store.addNotification({
                title: "Book Updated",
                message: book.name + " was updated successfully!",
                type: "success",
                insert: "top",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000, onScreen: true
                }
            });
        } catch (error) {
            console.error('Error updating book:', error);
            throw error;
        }
    };

    return (
        <div className="update-book-form-container">
            <h1>Update Book Entry</h1>
            <form onSubmit={handleSubmit} className="update-book-form">
                <div className="form-group">
                    <label htmlFor="name">Book Name:</label><br/>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={book.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author:</label><br/>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year:</label><br/>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={book.year}
                        onChange={handleChange}
                        min="1000"
                        max="9999"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Genre:</label><br/>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={book.genre}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label><br/>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        step="0.01"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label><br/>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={book.quantity}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="url">Image URL:</label><br/>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={book.url}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <button type="submit" className="form-button">Update Book</button>
            </form>
        </div>
    );
}

export default UpdateBookForm;
