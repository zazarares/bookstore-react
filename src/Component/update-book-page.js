import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'; // To get the book ID from the URL
import {fetchBookById, updateBook} from "../api-calls/filter-calls"; // Adjust the import based on your file structure

function UpdateBookForm() {
    const {productId} = useParams(); // Get the book ID from the URL
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

    // Fetch the book details when the component mounts
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const fetchedBook = await fetchBookById(productId); // Fetch book details by ID
                setBook(fetchedBook.book[0]);
                console.log(fetchedBook);
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
        console.log('Book updated:', book);
        try {
            await updateBook(productId, book); // Update the book using the API
            // Redirect or show a success message
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div>
            <h1>Update Book Entry</h1>
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

                <button type="submit">Update Book</button>
            </form>
        </div>
    );
}

export default UpdateBookForm;
