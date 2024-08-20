import React, {useEffect, useState} from "react";
import {getOrdersByUserID} from "../api-calls";
import OrderItem from "./order-components/order-item";
import UserStorage from "../storage/user-stores/user-storage";
import "../Styles/user.css"
import {useNavigate} from "react-router-dom";
const UserPage = () => {

    const [orders, setOrders] = useState([]);
    const userStore=UserStorage();
    const navigate=useNavigate();

    useEffect(() => {
        const GetOrdersByUserID = async () => {
            try {
                const userOrders = await getOrdersByUserID(userStore.user._id,userStore.logOut);
                setOrders(userOrders);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        }
        GetOrdersByUserID();
    }, [])


    const handleLogout=()=>{
        userStore.logOut();
        navigate("/")
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
            </div>
            <div className="row">
                {orders.map((order, index) => (
                    <div className="col-xl-12 mb-4" key={index}>
                        <OrderItem order={order}/>
                    </div>

                ))}
            </div>
            <div className="justify-content-center w-25" >
                <button className="sign-out-button" onClick={handleLogout}>Sign out</button>
            </div>
        </div>
    )
}
export default UserPage;