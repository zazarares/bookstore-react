import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_IP;
export const PORT = process.env.REACT_APP_API_PORT;
export const ENDPOINT = "/users";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}:${PORT}${ENDPOINT}/login/`, {username, password});

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        return response.data;
    } catch (error) {
        alert("Invalid Credentials!")
        throw error;
    }
}
export const register = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}:${PORT}${ENDPOINT}/`, user);

        if (response.status !== 201) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    } catch (error) {
        alert("Could not register user!")
        throw error;
    }
}
export const updateUser = async (id, user) => {
    try {
        const token = localStorage.getItem('token')

        const response = await axios.put(`${BASE_URL}:${PORT}${ENDPOINT}/`, user, {headers: {Authorization: "Bearer " + token}});

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    } catch (error) {
        alert("Could not register user!")
        throw error;
    }
}
export const getUser = async () => {
    try {
        const token = localStorage.getItem('token')

        const response = await axios.get(`${BASE_URL}:${PORT}${ENDPOINT}/id`, {headers: {Authorization: "Bearer " + token}});

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    } catch (error) {
        alert("Could not get user!")
        throw error;
    }
}