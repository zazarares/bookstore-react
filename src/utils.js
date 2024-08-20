
export const validateEmail = (email) => {
    return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email);    }
export const loginUser = async (response,userStore) => {
    try {
        const r = await response;

        if (r == null) {
            window.location.reload();
        } else {
            userStore.setUser(r.user);
            localStorage.setItem("token", r.token);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};
export const calculateTotalPrice = (order) => {
    return order.books.reduce((total, bookItem) => {
        const { price, quantity } = bookItem; 
        return total + (price * quantity);
    }, 0);
};
