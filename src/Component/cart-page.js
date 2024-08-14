import React, {useState} from 'react';
import CartList from "./order-components/cart-list";
import CartStorage from "../storage/order-stores/cart-storage";
import {sendOrder, updateQuantities} from "../api-calls"; // Adjust the path if necessary
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";
import "../Styles/cart-page.css"
import UserStorage from "../storage/user-stores/user-storage";

const CartPage = () => {
    const cartStore = CartStorage();
    const userStore = UserStorage();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleGoToProducts = () => {
        navigate("/products");
    }
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => {
        setModalIsOpen(false);
        navigate("/");
    }
    const executeOrder = async () => {
        await sendOrder(userStore.id, cartStore.bookList, userStore.jwt)
        await updateQuantities(cartStore.bookList, userStore.jwt)
    }
    const finishOrder = () => {
        if (userStore.jwt !== "" && userStore.username !== "") {
            executeOrder();
            openModal();
            cartStore.clear();
        }
        else {
            navigate("/login")
        }
    }
    if (!cartStore.empty()) {
        return (
            <div>
                <CartList></CartList>

                <button onClick={finishOrder}>Finish Order</button>
                <p1>Total Price:{cartStore.price}</p1>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <h2>Order Completed</h2>
                    <p>Order Completed Successfully</p>
                    <button onClick={closeModal}>Close</button>
                </Modal>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: '100vh'}}>
                <div className="text-center fs-1 mb-3">
                    Your Cart is empty
                </div>
                <button className="btn btn-primary w-25" onClick={handleGoToProducts}>
                    Go to Products
                </button>
            </div>
        );
    }
};

export default CartPage;
