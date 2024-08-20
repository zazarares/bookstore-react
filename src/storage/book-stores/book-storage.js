import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {fetchBookById} from "../../api-calls";

const initialBookState = {
    _id: "",
    name: "",
    author: "",
    price: "0-10000",
    year: "0-10000",
    genre: "",
    url: ""
};

const BookStorage = create(
    persist(
        (set, get) => ({
            book: initialBookState,
            exists: false,
            update: (field, value) => set((state) => ({
                book: {...state.book, [field]: value}
            })),
            updateRange: (field, min, max) => set((state) => ({
                book: {...state.book, [field]: `${min}-${max}`}
            })),
            setBook: (book) => set((state) => ({
                book: {...state.book, ...book},
                exists: true
            })),
            resetBook: () => set(() => ({
                book: {...initialBookState},
                exists: false
            })),
            getBook: (productId) => {
                const state = BookStorage.getState();
                if (state.book._id === productId)
                    return state.book;
                else {
                    const loadBook = async () => {
                        const result = await fetchBookById(productId)
                        return await result.book[0]
                    }
                    return loadBook().then(book => {
                        set(()=>({book:book}))
                        console.log(state.book)
                        return state.book
                    })
                }
            }
        }),
        {
            name: 'book-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default BookStorage;
