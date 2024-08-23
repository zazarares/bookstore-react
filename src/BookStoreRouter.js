import {Route, Routes} from "react-router-dom";
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
import OrderDetails from "./Component/order-components/order-details";
import AdminPage from "./Component/admin-page";
import AddBookPage from "./Component/add-book-page";
import UpdateBookPage from "./Component/update-book-page";
import UpdateUser from "./Component/update-user";

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
                <Route path="/user" element={<PrivateRoute type={"logged-in"}><UserPage/></PrivateRoute>}/>
                <Route path="/edit-user/:userId"
                       element={<PrivateRoute type={"logged-in"}><UpdateUser/></PrivateRoute>}/>
                <Route path="/product/:productId" element={<ProductDetails/>}/>
                <Route path="/product/update/:productId" element={<UpdateBookPage/>}/>
                <Route path="/order/:orderID" element={<OrderDetails/>}/>
                <Route path="/admin" element={<PrivateRoute type={"admin"}><AdminPage/></PrivateRoute>}/>
                <Route path="/add-book" element={<PrivateRoute type={"admin"}><AddBookPage/></PrivateRoute>}/>
            </Routes>
        );
    }
}

export default BookStoreRouter
