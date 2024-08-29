import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {getOrdersByUserID} from "../../api-calls/order-calls";
import userStorage from "../user-stores/user-storage";

const CompletedOrderStorage = create(persist((set) => ({
    orderList: [], detailedOrderList: [], bookDetails: [], isEmpty: true, getOrders: () => {

    },

    cacheOrders: async (userID) => {
        const fetchOrders = async () => {
            try {
                return await getOrdersByUserID(userID);
            } catch (error) {
                throw error;
            }
        }
        const state = CompletedOrderStorage.getState();
        if (state.isEmpty) {
            set(() => ({isEmpty: false}))
            const orders = await fetchOrders();
            set(() => ({orderList: orders}))
            return orders
        }
    }, getOrder: async (orderID) => {
        let order = CompletedOrderStorage.getState().orderList.find((order) => order._id === orderID);
        if (order) {
            return order;
        } else {
            try {
                const state = CompletedOrderStorage.getState();
                state.clear();
                const orders = await state.cacheOrders(userStorage.getState().user._id)
                return orders.find((order) => order._id === orderID);
            } catch (error) {
                throw error;
            }
        }
    }, clear: () => {
        set(() => ({orderList: [], bookDetails: [], isEmpty: true,}))
    }
}), {
    name: 'order-storage', storage: createJSONStorage(() => sessionStorage),
}));

export default CompletedOrderStorage;
