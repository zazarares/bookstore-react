import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../Styles/Register.css';
import useUserStorage from "../storage/user-stores/user-storage";
import {loginUser, validateEmail} from "../utils";
import {register} from "../api-calls/user-calls";

function RegisterPage() {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [fullName, setFullName] = useState()
    const navigate = useNavigate();
    const userStore = useUserStorage();

    const Register = async (e) => {

        e.preventDefault()

        if (password === confirmPassword) {
            if (validateEmail(email)) {
                const response = register({
                    isAdmin: false,
                    username: username,
                    email: email,
                    password: password,
                    name: fullName
                })

                loginUser(response, userStore);
                navigate("/");
            } else {
                alert("Email is not valid")
            }

        } else {
            alert("Passwords do not match")
        }
    }

    return (
        <div className="register-container">
            <form onSubmit={Register}>
                <div className="logo">
                    <h1>BOOKSTORE</h1>
                    <p>Welcome, please fill in your information</p>
                </div>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}
                           value={username} required/>
                </div>
                <div className="input-group">
                    <label htmlFor="fullName">fullName:</label>
                    <input type="text" id="fullName" name="fullName" onChange={(e) => setFullName(e.target.value)}
                           value={fullName} required/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}
                           required/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}
                           value={password} required/>
                </div>
                <div className="input-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password"
                           onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required/>
                </div>
                <button type="submit">Register</button>
                <div className="logo">
                    <p>Already have an account? Click <Link to="/login">here</Link> to login</p>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
