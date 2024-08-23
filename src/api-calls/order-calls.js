import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_IP;
export const PORT = process.env.REACT_APP_API_PORT;
export const ENDPOINT = "/orders";
export const sendOrder = async (userID, bookList, logOutUser) => {
    const token = localStorage.getItem('token')
    try {
        let books = [];
        bookList.map((book) => books.push({book_id: book.book._id, quantity: book.quantity}))
        const response = await axios.post(`${BASE_URL}:${PORT}${ENDPOINT}`, {
            userId: userID,
            books: books
        }, {headers: {Authorization: "Bearer " + token}});

        if (response.status === 403)
            logOutUser();

        if (response.status !== 201) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    } catch (error) {
        logOutUser();
        alert("Order could not be created")
        throw error;
    }
}
export const getOrdersByUserID = async (userID, logOutUser) => {
    const token = localStorage.getItem('token')

    try {
        const response = await axios.get(`${BASE_URL}:${PORT}${ENDPOINT}/user`, {headers: {Authorization: "Bearer " + token}});
        if (response.status === 403)
            logOutUser();

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response.data;
    } catch (error) {
        logOutUser();
        alert("Orders could not be fetched!")
        throw error;
    }
}
export const getOrders = async () => {
    const token = localStorage.getItem('token')

    try {
        const response = await axios.get(`${BASE_URL}:${PORT}${ENDPOINT}/`, {headers: {Authorization: "Bearer " + token}});

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response.data;
    } catch (error) {
        alert("Orders could not be fetched!")
        throw error;
    }
}
export const getOrderByID = async (id) => {

    try {
        const response = await axios.get(`${BASE_URL}:${PORT}${ENDPOINT}/${id}`);


        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response.data;
    } catch (error) {
        alert("Orders could not be fetched!")
        throw error;
    }
}