import axios from "axios";
import userStorage from "./storage/user-stores/user-storage";


export const fetchFilters = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:3001/books/filters")
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return await response.data;
    } catch (error) {
    } finally {
    }
};

export const fetchBooks = async (filters) => {
    try {
        console.log("here");

        const response = await axios.get("http://127.0.0.1:3001/books/filter?quantity=1-1000",{params: filters})

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }
        const result = await response.data;
        console.log(result)
        return result
    } catch (error) {
        console.log("error")
    } finally {
    }
};
export const fetchBookById = async (id) => {
    try {
        console.log(id);

        const response = await axios.get(`http://127.0.0.1:3001/books/filter`,{params:{_id:id}});

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }
        const result = await response.data;
        console.log(result)
        return result
    } catch (error) {
        console.log("error")
    } finally {
    }
};
export const sendOrder = async(userID,bookList,jwt) =>
{
    try{
        let books=[];
        bookList.map((book)=>books.push({book:book,quantity:1}))
        const response = await axios.post(`http://127.0.0.1:3001/orders`,{userId:userID,books:bookList},{headers:{Authorization:"Bearer "+jwt}});
        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }
    }
    catch(error){

    }
}
export const getOrdersByUserID = async(userID,jwt) =>
{

    try{
        const response = await axios.get(`http://127.0.0.1:3001/orders/${userID}`,{headers:{Authorization:"Bearer "+jwt}});
        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.data;
    }
    catch(error){

    }
}
export const updateQuantities = async(bookList,jwt) =>
{
    try{
        let books=[];
        bookList.map((book)=>{
            console.log(book);
            return books.push({_id:book.book._id,quantity:book.quantity});})
        console.log(books)
        const response = await axios.put(`http://127.0.0.1:3001/books/updateQuantity`,{bookList:books},{headers:{Authorization:"Bearer "+jwt}});
        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }
    }
    catch(error){
        console.log(error);
    }
}
export const VerifyCredentials = async(username,password) =>
{
    try{
        const response = await axios.get(`http://127.0.0.1:3001/users/check/${username}/${password}`);

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    }
    catch(error){

    }
}
export const register = async(user) =>
{
    try{
        const response = await axios.post(`http://127.0.0.1:3001/users/`,user);

        if (response.status!==201) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    }
    catch(error){

    }
}
export const getUsersByUsername = async(id) =>
{
    try{
        const response = await axios.get(`http://127.0.0.1:3001/users`);

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    }
    catch(error){

    }
}
