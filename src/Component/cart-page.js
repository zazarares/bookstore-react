import React, { useState } from 'react';
import CartListView from "./order-components/cart-list";
import CartStorage from "../storage/order-stores/cart-storage";
import {sendOrder} from "../api-calls"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../Styles/cart-page.css"
const CartPage = () => {
    const cartStore=CartStorage();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => {setModalIsOpen(false);navigate("/");}
    const finishOrder=()=>{
        sendOrder(cartStore.userId,cartStore.bookList)
        cartStore.clear();
        openModal();
    }
    return (
        <div >
            <CartListView></CartListView>

            <button onClick={finishOrder}>Finish Order</button>
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
};

export default CartPage;
