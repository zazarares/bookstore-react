import React, {useState} from 'react';


import {createBook} from "../api-calls/filter-calls";

function BookForm() {
    const [book, setBook] = useState({
        name: '',
        author: '',
        year: '',
        genre: '',
        price: '',
        quantity: '',
        url: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBook({
            ...book,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Book submitted:', book);
        createBook(book);
        // You can send the book data to your backend here, for example using fetch or axios
    };

    return (
        <div>
            <h1>Create a Book Entry</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Book Name:</label><br/>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={book.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="author">Author:</label><br/>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
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
                    />
                </div>

                <div>
                    <label htmlFor="genre">Genre:</label><br/>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={book.genre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label><br/>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="quantity">Quantity:</label><br/>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={book.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="url">Image URL:</label><br/>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={book.url}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Create Book</button>
            </form>
        </div>
    );
}

export default BookForm;
