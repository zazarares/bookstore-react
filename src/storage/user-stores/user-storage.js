import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
const userStore = create(
    persist(
        (set, get) => ({
            id: "",
            username: "",
            name: "",
            email: "",
            isAdmin: false,
            jwt: "",

            setUser: (user) => set(() => ({
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })),

            setJWTToken: (jwt) => set(() => ({ jwt: jwt })),

            logOut: () => set(() => ({
                id: "",
                username: "",
                name: "",
                email: "",
                isAdmin: false,
                jwt: ""
            }))
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default userStore;
