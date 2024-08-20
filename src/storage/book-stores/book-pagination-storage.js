import { create } from 'zustand'

const BookPaginationStorage = create((set) => ({
    page:1,
    limit:6,
    pageMax:1000,
    incrementPage: () => set((state) => ({ page: Math.min(state.page + 1,state.pageMax) })),
    decrementPage: () => set((state) => ({ page: Math.max(state.page - 1,1) })),
    setPage: (page) => set(() => ({ page: page })),
    setLimit: (limit) => set(() => ({ limit: limit })),
    setMaxPage:(max)=>set(() => ({ pageMax: max })),
}))

export default BookPaginationStorage