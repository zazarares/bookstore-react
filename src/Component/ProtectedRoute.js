import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import useUserStorage from "../storage/user-stores/user-storage";
const PrivateRoute = ({children}) => {
    const userStore = useUserStorage();
    const location = useLocation();

    if(!userStore.logged)
        return <Navigate to="/forbidden" state={{ from: location }} />;
    else
        return children;

};

export default PrivateRoute;
