import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';


import {fetchBookById, fetchBooks} from "../../api-calls/book-calls";
import BookSelectedFilterStorage from "./book-selected-filter-storage";
import BookPaginationStorage from "./book-pagination-storage";

const BookStorage = create(persist((set, get) => ({
        bookList: new Map(), exists: false, cacheLoaded: true, cacheBooks: () => {
            const fetchData = async () => {
                try {
                    const filter = BookSelectedFilterStorage.getState().filter;
                    let filters = {}

                    for (const key in filter) if (filter[key] !== "") filters[key] = filter[key];

                    filters["page"] = BookPaginationStorage.getState().page;
                    filters["limit"] = BookPaginationStorage.getState().limit;

                    const result = await fetchBooks(filters);

                    const books = result.book;
                    const numberOfBooks = result.bookNumber;

                    BookPaginationStorage.getState().setMaxPage(Math.ceil(numberOfBooks / BookPaginationStorage.getState().limit));

                    const updatedBookList = new Map(BookStorage.getState().bookList);

                    for (const book of books) {
                        updatedBookList.set(book._id, book);
                    }

                    set(() => ({
                        bookList: updatedBookList,
                        cacheLoaded: false
                    }));

                } catch (error) {
                    console.error('Error fetching books:', error);
                }
            };
            if (BookStorage.getState().cacheLoaded) {
                fetchData();
            }

        }, getBook: async (productId) => {
            const loadBook = async () => {
                try {
                    const result = await fetchBookById(productId)
                    return await result.book[0]
                } catch (error) {
                    throw error;
                }
            }
            const state = get();
            console.log(state.bookList);
            if (state.bookList.size > 0) {
                const existingBook = state.bookList.get(productId);
                // Check if the book already exists
                if (existingBook) {
                    // The book exists
                    return existingBook;
                } else {
                    // The book doesn't exist and is added
                    return loadBook().then(book => {
                        const updatedBookList = new Map(BookStorage.getState().bookList); // Start with the current bookList
                        updatedBookList.set(book._id, book); // Use set to update the Map
                        set(() => ({
                            bookList: updatedBookList
                        }));
                        return book;
                    })
                }
            } else {
                try {
                    return loadBook().then(book => {
                        const updatedBookList = new Map();
                        updatedBookList.set(book._id, book); // Use set to update the Map
                        set(() => ({
                            bookList: updatedBookList
                        }));
                        console.log(book);
                        return book;
                    })
                } catch (error) {
                    throw error;
                }
            }
        }, clear: () => {
            set(() => ({bookList: new Map(), cacheLoaded: true}));
        },
        addBooks: (books) => {
            const updatedBookList = BookStorage.getState().bookList.size > 0 ? new Map(BookStorage.getState().bookList) : new Map();
            for (const book of books) {
                updatedBookList.set(book._id, book);
            }
            set(() => ({bookList: updatedBookList, cacheLoaded: false}));

        },
        updateQuantities: (bookID, quantity) => {
            const updatedBookList = BookStorage.getState().bookList.size > 0 ? new Map(BookStorage.getState().bookList) : new Map(); // Start with the current bookList
            const book = updatedBookList.get(bookID);
            book.quantity = book.quantity - quantity;
            updatedBookList.set(bookID, book);
            set(() => ({bookList: updatedBookList, cacheLoaded: false}));
        }
    }),

    {
        name: 'book-storage', storage: createJSONStorage(() => sessionStorage),
    }));

export default BookStorage;
