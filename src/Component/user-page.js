import React from "react";
import UserStorage from "../storage/user-stores/user-storage";
import "../Styles/user.css"
import {Link, useNavigate} from "react-router-dom";

const UserPage = () => {

    const userStore = UserStorage();
    const navigate = useNavigate();

    const handleLogout = () => {
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
            <div className="justify-content-center w-25">
                <Link className="btn mb-3" to={`/edit-user/${userStore.user._id}`}>Edit</Link>
            </div>
            <div className="justify-content-center w-25">
                <button className="sign-out-button" onClick={handleLogout}>Sign out</button>
            </div>
        </div>
    )
}
export default UserPage;