import { create } from 'zustand';

const cartStore = create(
        (set, get) => ({
            bookList: [],
            userId: "66a8f42e351fc50bb1431cb7",
            price: 0,
            setBookList: (bookList) => set(() => ({ bookList })),
            addBook: (item) => {
                const state = get();
                const existingBook = state.bookList.find((bookItem) => bookItem.book._id === item.book._id);

                if (existingBook) {
                    set(() => ({
                        bookList: state.bookList.map((bookItem) =>
                            bookItem.book._id === item.book._id
                                ? { ...bookItem, quantity: bookItem.quantity + 1 }
                                : bookItem
                        ),
                    }));
                } else {
                    set(() => ({ bookList: [...state.bookList, { book: item.book, quantity: item.quantity }] }));
                }
                state.setPrice(state.price+item.book.price);
                console.log(state);
            },
            setQuantity: (id,quantity) => {
                const state = get();
                set(() => ({ bookList: state.bookList.map((item) =>
                        {
                            console.log(item.book);
                            return item.book._id === id ? { ...item, quantity: quantity } : item}
                    ) }));

            },
            clear: ()=> set(() => ({ bookList: [],price: 0 })),
            setPrice: (price)=> set(() => ({price: price })),
            empty: ()=> {
                const state = get();
                return state.bookList.length === 0;
            }
        }),
);

export default cartStore;