import React from 'react';
import "../Styles/navbar.css";
import {Link} from "react-router-dom";
class Navbar extends React.Component {
    render()
    {
        return (
            <div className="navigation-bar">
            <div className="left-navbar">
                <Link className="left-button" to={"/"}>Home</Link>
                <Link className="left-button" to={"/products"}>Produse</Link>
            </div>
            <Link className="center-button" to={"/"}></Link>
            <div className="right-navbar">
                <Link className="right-button" to={"/login"}>Login</Link>
                <a className="right-button" href="#produse">Cart</a>
            </div>
            </div>
        );
    }
}
export default Navbar;