import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

const CartStorage = create(
    persist(
        (set, get) => ({
            bookList: [],
            userId: "",
            price: 0,

            addBook: (item) => {
                const state = get();
                if (state.bookList.length > 0) {
                    const existingBook = state.bookList.find((bookItem) => bookItem.book._id === item.book._id);
                    // Check if the book already exists
                    if (existingBook) {
                        // The book exists, quantity increased
                        set(() => ({
                            bookList: state.bookList.map((bookItem) =>
                                bookItem.book._id === item.book._id
                                    ? {...bookItem, quantity: Math.min(bookItem.book.quantity, bookItem.quantity + 1)}
                                    : bookItem
                            ),
                        }));

                    } else {
                        // The book doesn't exist and is added
                        set(() => ({bookList: [...state.bookList, {book: item.book, quantity: item.quantity}]}));
                    }
                } else {
                    set(() => ({bookList: [...state.bookList, {book: item.book, quantity: item.quantity}]}));
                }
                state.calculatePrice();
            },

            removeBook: (id) => {
                const state = get();
                const bookToRemove = state.bookList.find(item => item.book._id === id);
                if (bookToRemove) {
                    const updatedPrice = state.price - (bookToRemove.book.price * bookToRemove.quantity);
                    set(() => ({
                        bookList: state.bookList.filter(item => item.book._id !== id),
                        price: updatedPrice
                    }));
                }
            },

            setQuantity: (id, quantity) => {
                const state = get();
                set(() => ({
                    bookList: state.bookList.map((item) => {
                            return item.book._id === id ? {...item, quantity: quantity} : item
                        }
                    )
                }));
            },

            clear: () => set(() => ({bookList: [], price: 0})),

            isEmpty: () => {
                const state = get();
                return state.bookList.length === 0;
            },

            calculatePrice: () => {
                const state = get();
                let price = 0;
                for (let i = 0; i < state.bookList.length; i++) {
                    price += state.bookList[i].book.price * state.bookList[i].quantity;
                }
                set(() => ({price: price}));
            }
        }),
        {
            name: 'cart-storage', // name of the item in storage (must be unique)
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default CartStorage;
