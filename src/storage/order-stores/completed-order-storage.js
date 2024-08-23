import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {getMultipleBooksFromList} from "../../api-calls/filter-calls";
import {getOrders, getOrdersByUserID} from "../../api-calls/order-calls";

const CompletedOrderStorage = create(persist((set) => ({
    partialOrderList: [], detailedOrderList: [], bookDetails: [], isEmpty: true,
    cacheOrders: async (userID, isAdmin) => {
        const fetchOrders = async () => {
            if (isAdmin)
                return await getOrders();
            else
                return await getOrdersByUserID(userID);

        }

        ///create a set of book id's for the get request
        const extractUniqueBookIDsFromOrders = (orders) => {
            const books = new Set();
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].books.length)
                    for (let j = 0; j < orders[i].books.length; j++) {
                        books.add(orders[i].books[j].book_id);
                    }
            }
            console.log(books);
            return books
        }

        ///get a list of books based on ids and save them in the store
        const fetchAndStoreBookDetails = async (orders) => {
            const books = extractUniqueBookIDsFromOrders(orders);
            const bookDetails = await getMultipleBooksFromList(Array.from(books));
            set(() => ({bookDetails: bookDetails}))
            console.log(bookDetails)
            return bookDetails;
        }
        ////check if initialization has been done already, if not then get all orders and all book details and cache them
        const state = CompletedOrderStorage.getState();
        if (state.isEmpty) {
            set(() => ({isEmpty: false}))
            fetchOrders().then((r) => {
                set(() => ({partialOrderList: r}))
                const orders = r;
                fetchAndStoreBookDetails(r).then(books => {
                    for (let i = 0; i < orders.length; i++) {
                        for (let j = 0; j < orders[i].books.length; j++) {
                            orders[i].books[j].book = books.find((book) => book._id === orders[i].books[j].book_id);
                        }
                    }
                    console.log(orders);
                    set(() => ({detailedOrderList: orders}))
                });
            });
        }
    },

    addNewOrder: (order) => {
        let localBookDetails = [];
        let bookToGet = [];
        let state = CompletedOrderStorage.getState();

        ///If orders aren't loaded yet, they are loaded and cached
        if (state.isEmpty)
            state.cacheOrders(order.userId);
        const getMultipleBooks = async (books) => {
            return await getMultipleBooksFromList(books);
        }

        ///find books that are not cached and create a list with their ids
        for (let i = 0; i < order.books.length; i++) {
            const foundBook = state.bookDetails.find((item) => item._id === order.books[i].book_id);
            if (foundBook)
                localBookDetails = [...localBookDetails, foundBook];
            else
                bookToGet = [...bookToGet, order.books[i].book_id];
        }

        ///get the books that are not cached and save them, add details to current order
        getMultipleBooks(bookToGet).then(localBooks => {
            const updatedBookDetails = [...state.bookDetails, ...localBooks];
            set(() => ({bookDetails: updatedBookDetails}));
            for (let i = 0; i < order.books.length; i++) {
                order.books[i].book = updatedBookDetails.find((book) => book._id === order.books[i].book_id);
            }
            set(() => ({detailedOrderList: [...state.detailedOrderList, order]}))
        });


    },

    getOrder: (orderID) => {
        return CompletedOrderStorage.getState().detailedOrderList.find((order) => order._id === orderID);
    },
    clear: () => {
        set(() => ({partialOrderList: [], detailedOrderList: [], bookDetails: [], isEmpty: true,}))
    }
}), {
    name: 'order-storage', storage: createJSONStorage(() => sessionStorage),
}));

export default CompletedOrderStorage;
