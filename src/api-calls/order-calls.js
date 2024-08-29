import axios from "axios";
import completedOrderStorage from "../storage/order-stores/completed-order-storage";
import UserStorage from "../storage/user-stores/user-storage";
import BookStorage from "../storage/book-stores/book-storage";

export const BASE_URL = process.env.REACT_APP_API_IP;
export const PORT = process.env.REACT_APP_API_PORT;
export const ENDPOINT = "/orders";
export const sendOrder = async (userID, bookList) => {
    const token = localStorage.getItem('token')
    try {
        let books = [];
        bookList.map((book) => books.push({book_id: book.book._id, quantity: book.quantity}))
        const response = await axios.post(`${BASE_URL}:${PORT}${ENDPOINT}`, {
            userId: userID,
            books: books
        }, {headers: {Authorization: "Bearer " + token}});
        if (response.status === 403)
            UserStorage.getState().logOut();

        if (response.status !== 201) {
            throw new Error('Network response was not ok');
        }
        completedOrderStorage.getState().clear();
        for (let i = 0; i < response.data.order.books.length; i++) {
            BookStorage.getState().updateQuantities(response.data.order.books[i].book_id, response.data.order.books[i].quantity);
        }
        return response;
    } catch (error) {
        alert("Order could not be created")
        throw error;
    }
}
export const getOrdersByUserID = async () => {
    const token = localStorage.getItem('token')

    try {
        const response = await axios.get(`${BASE_URL}:${PORT}${ENDPOINT}/user`, {headers: {Authorization: "Bearer " + token}});

        if (response.status === 403)
            UserStorage.getState().logOut();

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }


        return response.data;
    } catch (error) {
        alert("Orders could not be fetched!")
        throw error;
    }
}
