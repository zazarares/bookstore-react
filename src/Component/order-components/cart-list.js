import React, { useState, useEffect } from 'react';
import ProductItem from '../product-components/product-components/product-item';
import CartStorage from "../../storage/order-stores/cart-storage";
const CartListView = () => {
    const [books, setBooks] = useState([]);
    const [quantities, setQuantities] = useState({});
    const CartStore=CartStorage();

    useEffect(() => {
            setBooks(CartStore.bookList.map((book) => book.book));
            setQuantities(CartStore.bookList.map((book) => book.quantity));
    }, []);

    const handleQuantityChange = (bookId, quantity,index) => {
        setQuantities(prevQuantities => {
            const updatedArray = [...prevQuantities]; // Create a shallow copy
            updatedArray[index] = quantity; // Update the value at the specific index
            return updatedArray;
        });

        const bookList=CartStore.bookList;

        for(let i=0;i<bookList.length;i++)
        {
            if(bookList[i].book._id === bookId){
                CartStore.setQuantity(bookId,quantity);
            }
        }

    };
    return (
        <div className="container mt-5">
            <div className="row">
                {books.map((book, index) => (
                    <div className="col-12 mb-4" key={index}>
                        <ProductItem book={book}/>
                        <div className="ms-3">
                            <label htmlFor={`quantity-${book._id}`}>Quantity:</label>
                            <input
                                type="number"
                                id={`quantity-${book._id}`}
                                value={quantities[index] || 1}
                                min="1"
                                onChange={(e) => handleQuantityChange(book._id, Number( e.target.value),index)}
                            />
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
};

export default CartListView;
