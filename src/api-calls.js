import axios from "axios";


export const fetchFilters = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:3001/books/filters")
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
        const response = await axios.get("http://127.0.0.1:3001/books/filter?quantity=1-1000",{params: filters})

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
        const response = await axios.get(`http://127.0.0.1:3001/books/filter`,{params:{_id:id}});

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }

        return await response.data

    } catch (error) {
    alert("The ID of this book is not valid");
    throw error;
    }
};
export const sendOrder = async(userID,bookList,jwt,clearUserStore) =>
{
    try{
        let books=[];
        bookList.map((book)=>books.push({book:book,quantity:book.quantity}))
        const response = await axios.post(`http://127.0.0.1:3001/orders`,{userId:userID,books:bookList},{headers:{Authorization:"Bearer "+jwt}});

        if(response.status===403)
            clearUserStore();

        if (response.status!==201) {
            throw new Error('Network response was not ok');
        }
        return response.data;
    }
    catch(error){
        alert("Order could not be created")
        throw error;
    }
}
export const getOrdersByUserID = async(userID,jwt,clearUserStore) =>
{

    try{
        const response = await axios.get(`http://127.0.0.1:3001/orders/${userID}`,{headers:{Authorization:"Bearer "+jwt}});

        if(response.status===403)
            clearUserStore();

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
export const updateQuantities = async(bookList,jwt,clearUserStore) =>
{
    try{
        let books=[];
        bookList.map((book)=>{
            return books.push({_id:book.book._id,quantity:book.quantity});})

        const response = await axios.put(`http://127.0.0.1:3001/books/updateQuantity`,{bookList:books},{headers:{Authorization:"Bearer "+jwt}});

        if(response.status===403)
            clearUserStore();

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }
    }
    catch(error){
        alert("Book quantities could not be updated")
        throw error;
    }
}
export const checkUserCredentials = async(username, password) =>
{
    try{
        const response = await axios.get(`http://127.0.0.1:3001/users/check/${username}/${password}`);

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
        const response = await axios.post(`http://127.0.0.1:3001/users/`,user);

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
