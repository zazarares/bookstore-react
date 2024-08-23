import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware'
import CompletedOrderStorage from "../order-stores/completed-order-storage";

const initialUserState = {
    _id: "",
    username: "",
    name: "",
    email: "",
    isAdmin: false,
}
const UserStore = create(
    persist(
        (set) => ({
            user: initialUserState,
            isLoggedIn: false,
            setUser: (user) => set(() => ({user: user, isLoggedIn: true})),

            logOut: () => {
                set(() => ({user: initialUserState, isLoggedIn: false}))
                CompletedOrderStorage.getState().clear();
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default UserStore;
