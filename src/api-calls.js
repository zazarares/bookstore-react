import axios from "axios";

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

        const response = await axios.get("http://127.0.0.1:3001/books/filter?sortBy=year&sortOrder=desc",{params: filters})

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
        console.log("here");

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
export const sendOrder = async(userID,bookList) =>
{
    try{
        let books=[];
        bookList.map((book)=>books.push({book:book,quantity:1}))
        const response = await axios.post(`http://127.0.0.1:3001/orders`,{userId:userID,books:bookList});

        if (response.status!==200) {
            throw new Error('Network response was not ok');
        }
    }
    catch(error){

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