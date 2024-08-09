import { create } from 'zustand'

const bookDynamicFilterStore = create((set) => ({
    authors: [],
    genres:[],
    updateAuthors: (author) => set({ authors: author }),
    updateGenres: (genre) => set({ genres: genre }),
}))

export default bookDynamicFilterStore