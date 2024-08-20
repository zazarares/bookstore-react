import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {getOrderByID} from "../../api-calls";

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
            setOrder: (order) => set({order: order}),
            clearOrder: () => set({
                order: {
                    _id: "",
                    books: [],
                    userId: "",
                    totalPrice: 0,
                    date: null,
                },
            }),
            getOrder: (orderID) => {
                const state = CompletedOrderStorage.getState();
                if (state.order._id === orderID) {
                    return state.order
                } else {
                    const fetchOrders = async () => {
                        const response = await getOrderByID(orderID)
                        return response[0];
                    }
                    return fetchOrders().then((order) => {
                        set(()=>({order:order}))
                        return state.order
                    });
                }
            },
        }),
        {
            name: 'order-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default CompletedOrderStorage;
