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
import BookForm from "./Component/book-form";
import UpdateUser from "./Component/update-user";
import OrdersPage from "./Component/orders-page";
import AdminPanel from "./Component/admin-components/admin-panel";
import UserList from "./Component/admin-components/user-list";

class BookStoreRouter extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/login" element={<Login/>}/>

                <Route path="/register" element={<RegisterPage/>}/>

                <Route path="/user" element={<PrivateRoute type={"logged-in"}><UserPage/></PrivateRoute>}/>

                <Route path="/user-list" element={<PrivateRoute type={"admin"}><UserList/></PrivateRoute>}/>

                <Route path="/edit-user/:userId"
                       element={<PrivateRoute type={"logged-in"}><UpdateUser/></PrivateRoute>}/>

                <Route path="/admin-panel" element={<PrivateRoute type={"admin"}><AdminPanel/></PrivateRoute>}/>

                <Route path="/products" element={<ProductsPage/>}/>

                <Route path="/product/:productId" element={<ProductDetails/>}/>

                <Route path="/product/update/:productId"
                       element={<PrivateRoute type={"admin"}><BookForm type={"update"}/></PrivateRoute>}/>

                <Route path="/add-book"
                       element={<PrivateRoute type={"admin"}><BookForm type={"add"}/></PrivateRoute>}/>

                <Route path="/orders" element={<PrivateRoute type={"logged-in"}><OrdersPage/></PrivateRoute>}/>

                <Route path="/order/:orderID" element={<OrderDetails/>}/>

                <Route path="/forbidden" element={<ForbiddenPage/>}/>

                <Route path="/cart" element={<CartPage/>}/>


            </Routes>
        );
    }
}

export default BookStoreRouter
