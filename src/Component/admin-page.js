import React, {useEffect} from "react";
import OrderItem from "./order-components/order-item";
import UserStorage from "../storage/user-stores/user-storage";
import "../Styles/user.css"
import {Link, useNavigate} from "react-router-dom";
import completedOrderStorage from "../storage/order-stores/completed-order-storage";

const AdminPage = () => {

    const userStore = UserStorage();
    const orderStore = completedOrderStorage()
    const navigate = useNavigate();

    useEffect(() => {
        orderStore.cacheOrders(userStore.user._id, true)
    }, [])

    const handleLogout = () => {
        userStore.logOut();
        navigate("/")
    }
    const handleAddBook = () => {

    }


    return (
        <div className="container mt-5">
            <div className="col-12 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{userStore.user.name}</h5>
                        <p className="card-text">Email: {userStore.user.email}</p>
                        <p className="card-text">Username: {userStore.user.username}</p>
                        <p className="card-text">UserID: {userStore.user._id}</p>
                    </div>
                </div>
                <Link className="btn btn-primary col-2" to="/add-book">Add Book</Link>
            </div>
            <div className="row">
                {orderStore.detailedOrderList.map((order, index) => (
                    <div className="col-xl-12 mb-4" key={index}>
                        <OrderItem order={order}/>
                    </div>

                ))}
            </div>
            <div className="justify-content-center w-25">
                <button className="sign-out-button" onClick={handleLogout}>Sign out</button>
            </div>
        </div>
    )
}
export default AdminPage;