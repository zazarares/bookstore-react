import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "../Styles/navbar.css";
import useUserStorage from "../storage/user-stores/user-storage";

const Navbar = () => {
    const userStore = useUserStorage();
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate("/cart");
    }
    const goToLogin = () => {
        navigate("/login")
    }
    const goToUserPage = () => {
        navigate("/user")
    }
    const checkLogin = () => {
        if (userStore.logged)
            return (<button className="right-button" onClick={goToUserPage}>
                {userStore.user.name}
            </button>)
        else
            return (<button className="right-button" onClick={goToLogin}>
                Login
            </button>)

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
                <button className="right-button" onClick={handleCartClick}>
                    Cart
                </button>
            </div>
        </div>
    );
};

export default Navbar;
