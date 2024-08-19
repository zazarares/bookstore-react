import { create } from 'zustand'

const bookFilterStorage = create((set) => ({
    authors: [],
    genres:[],
    updateAuthors: (author) => set({ authors: author }),
    updateGenres: (genre) => set({ genres: genre }),
}))

export default bookFilterStorage