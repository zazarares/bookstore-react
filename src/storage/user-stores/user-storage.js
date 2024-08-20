import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
const initialUserState={
    _id: "",
    username: "",
    name: "",
    email: "",
    isAdmin: false,
}
const UserStore = create(
    persist(
        (set) => ({
            user:initialUserState,
            logged:false,
            setUser: (user) => set(() => ({ user: user, logged: true })),

            logOut: () => set(() => ({user:initialUserState,logged:false})),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default UserStore;
