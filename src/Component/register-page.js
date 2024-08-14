import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../Styles/Register.css';
import {VerifyCredentials} from "../api-calls";
import {register} from "../api-calls"
import UserStorage from "../storage/user-stores/user-storage";

function RegisterPage() {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [fullname, setFullName] = useState()
    const navigate = useNavigate();
    const userStore=UserStorage();
    const validateEmail = () => {
        return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email);    }
    const Register = (e) => {

        e.preventDefault()
        if (password === confirmPassword) {
            if (validateEmail(email))
            {
                const response=register({
                    isAdmin: false,
                    username: username,
                    email: email,
                    password: password,
                    name: fullname
                })
                response.then(async (r) => {
                    if (r == null) {
                        window.location.reload();
                    } else {
                        await response.then((r) => {
                            console.log(r);
                            userStore.setUser(r.user._id, r.user.username, r.user.name, r.user.email, r.user.isAdmin);
                            userStore.setJWTToken(r.token);

                        });
                        navigate("/");

                    }
                })
            }
            else
            {
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
                    <label htmlFor="fullname">FullName:</label>
                    <input type="text" id="fullname" name="fullname" onChange={(e) => setFullName(e.target.value)}
                           value={fullname} required/>
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
