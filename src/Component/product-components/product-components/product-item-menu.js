import {Store} from "react-notifications-component";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useCartStorage from "../../../storage/order-stores/cart-storage";
import CartStorage from "../../../storage/order-stores/cart-storage";
import {deleteBook} from "../../../api-calls/book-calls";

const ProductItemMenu = ({displayAddToCartButton, isUserAdmin, book}) => {
    const cartStore = useCartStorage();
    const [index, setIndex] = useState(null);
    const [disabled, setDisabled] = useState(false)
    const handleDelete = () => {
        try {
            deleteBook(book._id).then(() => Store.addNotification({
                title: "Book Deleted",
                message: book.name + " was deleted successfully!",
                type: "danger",
                insert: "top",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000, onScreen: true
                }
            }))
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        const bookList = CartStorage.getState().bookList;
        if (index === null) {
            for (let i = 0; i < bookList.length; i++) {
                if (bookList[i].book._id === book._id) {
                    setIndex(i);
                    setDisabled(book.quantity - (cartStore.bookList[i] ? cartStore.bookList[i].quantity : 0) <= 0)
                    return;
                }

            }
            setDisabled(book.quantity <= 0)
        } else setDisabled(book.quantity - (cartStore.bookList[index] ? cartStore.bookList[index].quantity : 0) <= 0)
    }, [cartStore.bookList]);

    return (<div>
        <div className="card-footer">
            {isUserAdmin === false && displayAddToCartButton === true && (<button
                    className="btn btn-primary w-100"
                    disabled={disabled}
                    onClick={() => {
                        Store.addNotification({
                            title: "SUCCESS",
                            message: book.name + " was added to cart",
                            type: "success",
                            insert: "top",
                            container: "top-left",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                                duration: 2000, onScreen: true
                            }
                        });
                        cartStore.addBook({book: book, quantity: 1});
                    }}
                >
                    Add to Cart
                </button>

            )}
            {isUserAdmin === true && displayAddToCartButton === true && (<div>
                    <Link
                        className="btn btn-primary w-100 mt-3"
                        to={`/product/update/${book._id}`}
                    >
                        Update Book
                    </Link>
                    <button
                        className="btn btn-danger bg-danger w-100 mt-3"
                        onClick={handleDelete}
                    >
                        DELETE BOOK
                    </button>
                </div>

            )}
        </div>
    </div>)
}
export default ProductItemMenu;