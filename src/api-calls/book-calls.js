import axios from "axios";
import {getUserDetailsFromToken, reloadBookCache, reloadCache} from "../utils";

export const BASE_URL = process.env.REACT_APP_API_IP;
export const PORT = process.env.REACT_APP_API_PORT;
export const ENDPOINT = "/books";
export const fetchFilters = async (filters) => {
    try {
        const response = await axios.get(`${BASE_URL}:${PORT}${ENDPOINT}/filters`, {params: filters})
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return await response.data;
    } catch (error) {
        alert("Filters could not be fetched!")
        throw error;
    }
};
export const createBook = async (book) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${BASE_URL}:${PORT}${ENDPOINT}/`, book, {headers: {Authorization: "Bearer " + token}});

        if (response.status !== 201) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    } catch (error) {
        alert("Book could not be created")
        throw error;
    }
}
export const updateBook = async (id, book) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.put(`${BASE_URL}:${PORT}${ENDPOINT}/${id}`, book, {headers: {Authorization: "Bearer " + token}});
        reloadCache(getUserDetailsFromToken(token))
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    } catch (error) {
        alert("Book could not be updated")
        throw error;
    }
}
export const deleteBook = async (id) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.delete(`${BASE_URL}:${PORT}${ENDPOINT}/${id}`, {headers: {Authorization: "Bearer " + token}});
        reloadCache(getUserDetailsFromToken(token))
        reloadBookCache();
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    } catch (error) {
        alert("Could not delete book")
        throw error;
    }
}
export const fetchBooks = async (filters) => {
    try {
        const response = await axios.get(`${BASE_URL}:${PORT}${ENDPOINT}/filter`, {params: filters})

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return await response.data;
    } catch (error) {
        alert("Books could not be fetched!")
        throw error;
    }
};
export const fetchBookById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}:${PORT}${ENDPOINT}/filter`, {params: {_id: id}});

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return await response.data

    } catch (error) {
        alert("The ID of this book is not valid");
        throw error;
    }
};
export const getMultipleBooksFromList = async (bookList) => {
    try {
        const response = await axios.post(`${BASE_URL}:${PORT}${ENDPOINT}/bookList`, {order: bookList});

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response.data;
    } catch (error) {
        //clearUserStore();
        alert("Books could not be fetched from the set!")
        throw error;
    }
}