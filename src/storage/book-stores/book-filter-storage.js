import { create } from 'zustand'

const BookFilterStorage = create((set) => ({
    authors: [],
    genres:[],
    updateAuthors: (author) => set({ authors: author }),
    updateGenres: (genre) => set({ genres: genre }),
}))

export default BookFilterStorage