import React, {useEffect, useState} from 'react';
import CartList from "./order-components/cart-list";
import useCartStorage from "../storage/order-stores/cart-storage";
import {useNavigate} from "react-router-dom";
import "../Styles/cart-page.css"
import useUserStorage from "../storage/user-stores/user-storage";
import EmptyCart from "./order-components/empty-cart";
import {sendOrder} from "../api-calls/order-calls";
import LoadingPage from "./loading-page";
import {getMultipleBooksFromList} from "../api-calls/book-calls";
import bookStorage from "../storage/book-stores/book-storage";
import BookStorage from "../storage/book-stores/book-storage";
import {Store} from "react-notifications-component";

const CartPage = () => {
    const [order, setOrder] = useState({})
    const [status, setStatus] = useState(400)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const cartStore = useCartStorage();
    const userStore = useUserStorage();
    const navigate = useNavigate();

    const finishOrder = () => {
        setLoading(true)
        const executeOrder = async () => {
            try {
                const orderResponse = await sendOrder(userStore.user._id, cartStore.bookList);
                setOrder(orderResponse.data.order);
                setStatus(orderResponse.status);
            } catch (error) {
                setError(true);
                console.error('Error executing order:', error);
            } finally {
                setLoading(false);
            }
        }
        if (userStore.isLoggedIn) {
            executeOrder().then(() => {
                if (status === 201) {
                    cartStore.clear();
                    navigate(`/order/${order._id}`);
                }
            })
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        const bookList = cartStore.bookList;
        const bookIds = [];
        for (let i = 0; i < bookList.length; i++) {
            bookIds.push(bookList[i].book._id);
        }
        try {
            getMultipleBooksFromList(bookIds).then((returnedBooks) => {
                bookStorage.getState().addBooks(returnedBooks);
            }).then(() => {
                let notificationMessage = "";
                const cartStoreBookList = JSON.parse(JSON.stringify(cartStore.bookList));
                for (let i = 0; i < cartStoreBookList.length; i++) {
                    const book = BookStorage.getState().bookList.get(cartStoreBookList[i].book._id)
                    if (book) {
                        const quantity = Math.min(cartStoreBookList[i].quantity, book.quantity);
                        cartStore.removeBook(book._id);
                        if (quantity > 0) {
                            cartStore.addBook({book: book, quantity: quantity});
                        } else {
                            notificationMessage += book.name + " is no longer in stock\n";
                        }
                    } else {
                        cartStore.removeBook(cartStoreBookList[i].book._id);
                        notificationMessage += cartStoreBookList[i].book.name + " was removed from the store\n";
                    }
                }
                return notificationMessage;
            }).then((notificationMessage) => {
                if (notificationMessage.length > 0) {
                    Store.addNotification({
                        title: "Books no longer for sale",
                        message: notificationMessage,
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000, onScreen: true
                        }
                    });
                }
            })
        } catch (err) {
            throw err;
        }
    }, [error]);

    if (!cartStore.isEmpty() && !userStore.user.isAdmin) {
        if (!loading) {
            return (<div>
                <CartList></CartList>
                <p>Total Price:{cartStore.price}</p>
                <button onClick={finishOrder}>Finish Order</button>
            </div>);
        } else return (<LoadingPage></LoadingPage>)
    } else {
        if (cartStore.isEmpty()) return (<EmptyCart/>);
    }
};

export default CartPage;
