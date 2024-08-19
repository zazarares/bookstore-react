import { create } from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

const initialBookState = {
    _id: "",
    name: "",
    author: "",
    price: "0-10000",
    year: "0-10000",
    genre: "",
    url: ""
};

const bookStorage = create(
    persist(
        (set) => ({
            book: initialBookState,
            exists: false,
            update: (field, value) => set((state) => ({
                book: { ...state.book, [field]: value }
            })),
            updateRange: (field, min, max) => set((state) => ({
                book: { ...state.book, [field]: `${min}-${max}` }
            })),
            setBook: (book) => set((state) => ({
                book: { ...state.book, ...book },
                exists: true
            })),
            resetBook: () => set(() => ({
                book: { ...initialBookState },
                exists: false
            }))
        }),
        {
            name: 'book-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default bookStorage;
