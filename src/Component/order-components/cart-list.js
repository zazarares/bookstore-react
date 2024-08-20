import React, {useState, useEffect} from 'react';
import ProductItem from '../product-components/product-components/product-item';
import CartStorage from "../../storage/order-stores/cart-storage";

const CartList = () => {

    const [books, setBooks] = useState([]);
    const [quantities, setQuantities] = useState({});
    const CartStore = CartStorage();

    useEffect(() => {
        setBooks(CartStore.bookList.map((book) => book.book));
        setQuantities(CartStore.bookList.map((book) => book.quantity));
    }, [CartStore.bookList]);

    const handleQuantityChange = (bookId, quantity, index) => {
            setQuantities(prevQuantities => {
                const updatedArray = [...prevQuantities];
                updatedArray[index] = quantity;
                return updatedArray;
            });

            const bookList = CartStore.bookList;

            for (let i = 0; i < bookList.length; i++) {
                if (bookList[i].book._id === bookId) {
                    CartStore.setPrice(CartStore.price + bookList[i].book.price * (quantity - bookList[i].quantity));
                    CartStore.setQuantity(bookId, quantity);
                }
            }
    };
    const handleRemoveBook = (id) => {
        CartStore.removeBook(id);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {books.map((book, index) => (
                    <div className="col-12 mb-4" key={index}>
                        <div className="d-flex align-items-start align-items-center">
                            <div className="flex-grow-1 p-3 product-item-container">
                                <ProductItem book={book} inCart={true}/>
                            </div>
                            <div className="ms-5">
                                <label htmlFor={`quantity-${book._id}`} className="form-label">Quantity:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`quantity-${book._id}`}
                                    value={Math.min(quantities[index], book.quantity)}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(book._id, Number(e.target.value), index)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => handleRemoveBook(book._id, index)}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartList;
