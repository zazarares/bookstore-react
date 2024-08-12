import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Component/login-page";
import React from "react";
import Home from "./Home";
import ProductsPage from "./Component/products-page";
import RegisterPage from "./Component/register-page";
import ProductDetails from "./Component/product-components/product-components/product-details";
import CartPage from "./Component/cart-page";
class BookStoreRouter extends React.Component {
    render() {
        return(
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/product/:productId" element={<ProductDetails/>}/>
            </Routes>
        );
    }
}
export default BookStoreRouter
