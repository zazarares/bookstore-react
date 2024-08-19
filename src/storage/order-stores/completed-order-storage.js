import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const CompletedOrderStorage = create(
    persist(
        (set) => ({
            order: {
                _id: "",
                books: [],
                userId: "",
                totalPrice: 0,
                date: null,
            },
            setOrder: (order) => set({ order:order }),
            clearOrder: () => set({
                order: {
                    _id: "",
                    books: [],
                    userId: "",
                    totalPrice: 0,
                    date: null,
                },
            }),
        }),
        {
            name: 'order-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default CompletedOrderStorage;
