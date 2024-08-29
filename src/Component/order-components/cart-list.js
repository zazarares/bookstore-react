import React from 'react';
import ProductItem from '../product-components/product-components/product-item';
import useCartStorage from "../../storage/order-stores/cart-storage";

const CartList = () => {

    const CartStore = useCartStorage();

    const handleQuantityChange = (bookId, quantity) => {

        const bookList = CartStore.bookList;

        for (let i = 0; i < bookList.length; i++) {
            if (bookList[i].book._id === bookId) {
                CartStore.setQuantity(bookId, quantity);
                CartStore.calculatePrice();

            }
        }
    };
    const handleRemoveBook = (id) => {
        CartStore.removeBook(id);
    }

    return (<div className="container mt-5">
        <div className="row">
            {CartStore.bookList.map((data, index) => (<div className="col-12 mb-4" key={index}>
                <div className="d-flex align-items-start align-items-center">
                    <div className="flex-grow-1 p-3 product-item-container">
                        <ProductItem book={data.book} displayAddToCartButton={false}/>
                    </div>
                    <div className="ms-5">
                        <label htmlFor={`quantity-${data.book._id}`}
                               className="form-label">Quantity:</label>
                        <input
                            type="number"
                            className="form-control"
                            id={`quantity-${data.book._id}`}
                            value={Math.min(data.quantity, data.book.quantity)}
                            min="1"
                            onChange={(e) => handleQuantityChange(data.book._id, Number(e.target.value), index)}
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleRemoveBook(data.book._id)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            </div>))}
        </div>
    </div>);
};

export default CartList;
