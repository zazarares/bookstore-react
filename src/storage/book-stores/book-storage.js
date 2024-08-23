import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';


import {fetchBookById, fetchBooks} from "../../api-calls/filter-calls";
import BookSelectedFilterStorage from "./book-selected-filter-storage";
import BookPaginationStorage from "./book-pagination-storage";

const BookStorage = create(
    persist(
        (set, get) => ({
            bookList: [],
            exists: false,
            isEmpty: true,
            cacheBooks: () => {
                const fetchData = async () => {
                    try {
                        const filter = BookSelectedFilterStorage.getState().filter;
                        let filters = {}

                        for (const key in filter)
                            if (filter[key] !== "")
                                filters[key] = filter[key];

                        filters["page"] = BookPaginationStorage.getState().page;
                        filters["limit"] = BookPaginationStorage.getState().limit;

                        const result = await fetchBooks(filters);

                        const books = result.book;
                        const numberOfBooks = result.bookNumber;

                        BookPaginationStorage.getState().setMaxPage(Math.ceil(numberOfBooks / BookPaginationStorage.getState().limit));
                        set(() => ({bookList: books, isEmpty: false}));
                    } catch (error) {
                        console.error('Error fetching books:', error);
                    }
                };
                if (BookStorage.getState().isEmpty) {
                    fetchData();
                }

            },
            getBook: (productId) => {
                const loadBook = async () => {
                    const result = await fetchBookById(productId)
                    return await result.book[0]
                }
                const state = get();
                if (state.bookList.length > 0) {
                    const existingBook = state.bookList.find((bookItem) => bookItem._id === productId);
                    // Check if the book already exists
                    if (existingBook) {
                        // The book exists, quantity increased
                        return existingBook;
                    } else {
                        // The book doesn't exist and is added
                        return loadBook().then(book => {
                            set(() => ({bookList: [...state.bookList, book]}));
                            console.log(book);
                            return book;
                        })
                    }
                } else {
                    return loadBook().then(book => {
                        set(() => ({bookList: [...state.bookList, book]}));
                        return book;
                    })
                }
            },
            clear: () => {
                set(() => ({bookList: [], isEmpty: true}));
            },
        }),

        {
            name: 'book-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default BookStorage;
