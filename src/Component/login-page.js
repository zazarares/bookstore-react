import React, {useState} from 'react';
import "../Styles/login.css";
import {Link, useNavigate} from "react-router-dom";
import {VerifyCredentials} from "../api-calls";

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const checkLogin=(e)=>{
        e.preventDefault()
        console.log(username,password)
        const response=VerifyCredentials(username,password)
        console.log(response)
        response.then((r)=> {
            if(r==null)
        {
            window.location.reload();
        }
        else
        {
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
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
