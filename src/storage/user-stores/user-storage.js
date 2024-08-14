import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const userStore = create(
    persist(
        (set, get) => ({
            id: "",
            username: "",
            name: "",
            email: "",
            isAdmin: false,
            jwt: "",
            setUser: (id, username, name, email, isAdmin) => set(() => ({
                id: id,
                username: username,
                name: name,
                email: email,
                isAdmin: isAdmin,
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
            name: 'user-storage', // unique name for storage (must be unique across your app)
            getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
            // Alternatively, you can use sessionStorage or any custom storage
        }
    )
);

export default userStore;
