import {BrowserRouter, Route, Routes,Switch } from "react-router-dom";
import Login from "./Component/login-page";
import React from "react";
import Home from "./Home";
import ProductsPage from "./Component/products-page";
import RegisterPage from "./Component/register-page";
import ProductDetails from "./Component/product-components/product-components/product-details";
import CartPage from "./Component/cart-page";
import UserPage from "./Component/user-page";
import PrivateRoute from "./Component/ProtectedRoute";
import ForbiddenPage from "./Component/forbidden-page";

class BookStoreRouter extends React.Component {
    render() {
        return (
            <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forbidden" element={<ForbiddenPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/user" element={<PrivateRoute><UserPage/></PrivateRoute>}/>
                    <Route path="/product/:productId" element={<ProductDetails/>}/>
            </Routes>
        );
    }
}

export default BookStoreRouter
