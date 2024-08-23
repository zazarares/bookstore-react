import React from 'react';
import {Link} from 'react-router-dom';
import "../Styles/navbar.css";
import useUserStorage from "../storage/user-stores/user-storage";

const Navbar = () => {
    const userStore = useUserStorage();
    const checkLogin = () => {
        if (userStore.isLoggedIn)
            if (userStore.user.isAdmin) {
                return (<Link className="right-button" to={"/admin"}>
                    {userStore.user.name}
                </Link>)
            } else {
                return (<Link className="right-button" to={"/user"}>
                    {userStore.user.name}
                </Link>)
            }
        else
            return (<Link className="right-button" to={"/login"}>
                Login
            </Link>)

    }

    return (
        <div className="navigation-bar">
            <div className="left-navbar">
                <Link className="left-button" to={"/user"}>
                    HOME
                </Link>
                <Link className="left-button" to={"/products"}>Produse</Link>
            </div>
            <Link className="center-button" to={"/"}></Link>
            <div className="right-navbar">
                <div>
                    {checkLogin()}
                </div>
                <Link className="right-button" to={"/cart"}>
                    Cart
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
