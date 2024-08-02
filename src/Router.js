import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Component/login-page";
import React from "react";
import Home from "./Home";
import Produse from "./Component/product-page";
import Register from "./Component/register-page";
import ProductDetails from "./Component/product-components/product-details";
class Router extends React.Component {
    render() {
        return(
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/produse" element={<Produse/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/:productId" element={<ProductDetails/>}/>
            </Routes>
        );
    }
}
export default Router
