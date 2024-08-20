import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_IP;
const PORT = process.env.REACT_APP_API_PORT;
export const fetchFilters = async () => {
    try {
        const response = await axios.get(`${BASE_URL}:${PORT}/books/filters`)
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return await response.data;
    } catch (error) {
        alert("Filters could not be fetched!")
        throw error;
    }
};

export const fetchBooks = async (filters) => {
    try {
        const response = await axios.get(`${BASE_URL}:${PORT}/books/filter?quantity=1-1000`,{params: filters})

        if (response.status!==200) {
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
        const response = await axios.get(`${BASE_URL}:${PORT}/books/filter`,{params:{_id:id}});

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }

        return await response.data

    } catch (error) {
    alert("The ID of this book is not valid");
    throw error;
    }
};
export const sendOrder = async(userID,bookList,clearUserStore) =>
{
    const token=localStorage.getItem('token')
    try{
        let books=[];
        bookList.map((book)=>books.push({book:book.book._id,quantity:book.quantity}))
        const response = await axios.post(`${BASE_URL}:${PORT}/orders`,{userId:userID,books:books},{headers:{Authorization:"Bearer "+token}});

        if(response.status===403)
            clearUserStore();

        if (response.status!==201) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    }
    catch(error){
        clearUserStore();
        alert("Order could not be created")
        throw error;
    }
}
export const getOrdersByUserID = async(userID,clearUserStore) =>
{
    const token=localStorage.getItem('token')

    try{
        const response = await axios.get(`${BASE_URL}:${PORT}/orders/user/${userID}`,{headers:{Authorization:"Bearer "+token}});
        if(response.status===403)
            clearUserStore();

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }

        return response.data;
    }
    catch(error){
        //clearUserStore();
        alert("Orders could not be fetched!")
        throw error;
    }
}
export const getOrderByID = async(id) =>
{

    try{
        const response = await axios.get(`${BASE_URL}:${PORT}/orders/${id}`);


        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }

        return response.data;
    }
    catch(error){
        alert("Orders could not be fetched!")
        throw error;
    }
}
export const checkUserCredentials = async(username, password) =>
{
    try{
        const response = await axios.get(`${BASE_URL}:${PORT}/users/login/${username}/${password}`);

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }

        return response.data;
    }
    catch(error){
        alert("Invalid Credentials!")
        throw error;
    }
}
export const register = async(user) =>
{
    try{
        const response = await axios.post(`${BASE_URL}:${PORT}/users/`,user);

        if (response.status!==201) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    }
    catch(error){
        alert("Could not register user!")
        throw error;
    }
}
