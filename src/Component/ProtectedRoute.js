import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import useUserStorage from "../storage/user-stores/user-storage";

const PrivateRoute = ({children, type}) => {
    const userStore = useUserStorage();
    const location = useLocation();
    const getAuthType = (type) => {
        switch (type) {
            case "logged-in":
                return !userStore.isLoggedIn;
            case "admin":
                return !userStore.user.isAdmin;
            default:
                return false;
        }
    }
    if (getAuthType(type))
        return <Navigate to="/forbidden" state={{from: location}}/>;
    else
        return children;

};

export default PrivateRoute;
