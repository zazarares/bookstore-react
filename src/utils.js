import completedOrderStorage from "./storage/order-stores/completed-order-storage";
import {jwtDecode} from "jwt-decode";
import BookStorage from "./storage/book-stores/book-storage";
import {getMultipleBooksFromList} from "./api-calls/book-calls";

export const validateEmail = (email) => {
    return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email);
}
export const saveUserToStore = async (response, userStore) => {
    try {
        const r = await response;

        if (r == null) {
            window.location.reload();
        } else {
            userStore.setUser(r.user);
            localStorage.setItem("token", r.token);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};
export const calculateTotalPrice = (order) => {
    return order.books.reduce((total, bookItem) => {
        const {price, quantity} = bookItem;
        return total + (price * quantity);
    }, 0);
};
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export const reloadCache = (user) => {
    completedOrderStorage.getState().clear();
    completedOrderStorage.getState().cacheOrders(user.id, user.isAdmin)

}
export const reloadBookCache = () => {
    BookStorage.getState().clear();
    BookStorage.getState().cacheBooks();

}
export const getUserDetailsFromToken = (token) => {
    const {id, isAdmin} = jwtDecode(token);
    return {id, isAdmin};

}
export const extractUniqueBookIDsFromOrders = (orders) => {
    const books = new Set();
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].books.length) for (let j = 0; j < orders[i].books.length; j++) {
            if (BookStorage.getState().bookList.size > 0) {
                if (BookStorage.getState().bookList.get(orders[i].books[j].book_id) === undefined) books.add(orders[i].books[j].book_id);
            } else books.add(orders[i].books[j].book_id);

        }
    }
    return books
}
export const matchBooksAndOrders = (books, orders) => {
    const detailedOrders = JSON.parse(JSON.stringify(orders));
    for (let i = 0; i < detailedOrders.length; i++) {
        for (let j = 0; j < detailedOrders[i].books.length; j++) {
            detailedOrders[i].books[j].book = books.find((book) => book._id === detailedOrders[i].books[j].book_id);
        }
    }
    return detailedOrders;
}
export const fetchBookDetails = async (orders) => {

    const books = orders.length !== undefined ? extractUniqueBookIDsFromOrders(orders) : extractUniqueBookIDsFromOrders([orders]);
    if (books.size > 0)
        return await getMultipleBooksFromList(Array.from(books));
    else
        return [];
}