import React from 'react';
import "../Styles/Register.css"
import {Link} from "react-router-dom";
class RegisterPage extends React.Component {
    render(){
        return(<div class="register-container">

            <form action="#">
                <div class="logo">
                    <h1>BOOKSTORE</h1>
                    <p>Welcome, please fill in your information</p>
                </div>
                <div class="input-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div class="input-group">
                    <label for="firstname">Firstname:</label>
                    <input type="text" id="firstname" name="firstname" required/>
                </div>
                <div class="input-group">
                    <label for="lastname">Lastname:</label>
                    <input type="text" id="lastname" name="lastname" required/>
                </div>
                <div class="input-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <div class="input-group">
                    <label for="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" required/>
                </div>
                <div class="input-group">
                    <label for="phone-number">Phone Number:</label>
                    <input type="tel" id="phone-number" name="phone-number" required/>
                </div>
                <button type="submit">Register</button>
                <div class="logo">
                    <p>Already have an account, Click <Link to={"/login"}> here</Link> to login</p>
                </div>
            </form>

        </div>)
    }

}
export default RegisterPage;