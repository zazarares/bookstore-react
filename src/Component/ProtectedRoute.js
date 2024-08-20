import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import userStorage from "../storage/user-stores/user-storage";
const PrivateRoute = ({children}) => {
    const userStore = userStorage();
    const location = useLocation();

    if(!userStore.logged)
        return <Navigate to="/forbidden" state={{ from: location }} />;
    else
        return children;

};

export default PrivateRoute;
