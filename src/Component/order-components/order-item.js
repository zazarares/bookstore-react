import React, {useEffect, useState} from 'react';
import {fetchBookById} from "../../api-calls";

const OrderItem = ({order}) => {
    const [bookList, setBookList] = useState([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const getBooks = async () => {
            console.log(order);
            for (const item of order.books) {
                console.log(item);
                try {
                    const bookL = await fetchBookById(item.book);
                    const book = bookL.book;
                    console.log(book);
                    // Update the state with the fetched book
                    setBookList((prevBookList) => [...prevBookList, book]);
                } catch (error) {
                    console.error('Error fetching book:', error);
                }
            }
            console.log(bookList);
        }
        if (order.length !== 0) {
            getBooks();
        }
    }, []);
    useEffect(() => {
        renderBooks()
        calculateTotalPrice(bookList)
    }, [bookList])
    const renderBooks = () => {
        console.log(bookList)
        if (bookList.length !== 0) {
            return bookList.map((book, index) => (
                <div key={book._id} className="d-flex flex-column mb-3 border p-3 rounded">
                    <h6 className="fw-bold">{book[0].name}</h6>
                    <p className="mb-1">Price: {book[0].price}RON</p>
                    <p className="mb-1">Quantity: {order.books[index].quantity}</p>
                </div>
            ))
        }
    }
    const calculateTotalPrice = (books) => {
        const total = books.reduce((acc, book, index) => {
            const quantity = order.books[index].quantity;
            return acc + (book[0].price * quantity);
        }, 0);
        setPrice(total);
    };
    return (
        <div className="card mb-3 h-100">
            <div className="row g-0 h-100">
                <div className="col-md-8">
                    <div className="card-body d-flex flex-column justify-content-center">
                        <h5 className="card-title">ID: {order._id}</h5>
                        <p className="card-text">User ID: {order.userId}</p>
                        <div>{renderBooks()}</div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end p-3">
                    <div>
                        <h6 className="fw-bold text-end">Total Price: {price} RON</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
