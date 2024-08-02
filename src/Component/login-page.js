import React from 'react';
import "../Styles/login.css"
import {Link} from "react-router-dom";
class LoginPage extends React.Component {
    render(){
        return(<div class="login-container">
            <form action="index.html">
                <div class="logo">
                    <h1>BOOKSTORE</h1>
                    <p>Welcome back! Please log in.</p>
                </div>
                <div class="input-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div class="input-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit">Login</button>
                <div class="logo">
                    <p>No account? Click <Link to={"/register"}> here</Link> to register</p>
                </div>
            </form>

        </div>)
    }

}
export default LoginPage;