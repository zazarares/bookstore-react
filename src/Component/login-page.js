import React, {useState} from 'react';
import "../Styles/login.css";
import {Link, useNavigate} from "react-router-dom";
import {VerifyCredentials} from "../api-calls";
import UserStorage from "../storage/user-stores/user-storage";

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const userStore = UserStorage();
    const checkLogin = (e) => {
        e.preventDefault()
        const response = VerifyCredentials(username, password)
        response.then(async (r) => {
            if (r == null) {
                window.location.reload();
            } else {
                await response.then((r) => {
                    userStore.setUser(r.user._id, r.user.username, r.user.name, r.user.email, r.user.isAdmin);
                    userStore.setJWTToken(r.token);
                });
                navigate("/");
            }
        })
    }
    return (
        <div className="login-container">
            <form onSubmit={checkLogin}>
                <div className="logo">
                    <h1>BOOKSTORE</h1>
                    <p>Welcome back! Please log in.</p>
                </div>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username}
                           onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">Login</button>
                <div className="logo">
                    <p>No account? Click <Link to="/register">here</Link> to register</p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
