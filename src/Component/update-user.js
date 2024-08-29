import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getUser, updateUser} from "../api-calls/user-calls";
import userStorage from "../storage/user-stores/user-storage";
import {Store} from "react-notifications-component";
import "../Styles/update-user.css"

function UpdateUserForm() {
    const {userId} = useParams(); // Get the user ID from the URL
    const userStore = userStorage();
    const [user, setUser] = useState({
        _id: '', name: '', username: '', email: '', password: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUser();
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        try {
            fetchUser();
        } catch (error) {
            throw error;
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user, [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            updateUser(userId, user).then(() => {
                userStore.setUser(user)
                Store.addNotification({
                    title: "Details Updated",
                    message: "Your details have been updated successfully",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000, onScreen: true
                    }
                });
            });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (<div className="update-user-container">
            <h1 className="update-user-title">Update User</h1>
            <form onSubmit={handleSubmit}>
                <div className="update-user-form-group">
                    <label htmlFor="name" className="update-user-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        className="update-user-input"
                    />
                </div>

                <div className="update-user-form-group">
                    <label htmlFor="username" className="update-user-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                        className="update-user-input"
                    />
                </div>

                <div className="update-user-form-group">
                    <label htmlFor="email" className="update-user-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="update-user-input"
                    />
                </div>

                <div className="update-user-form-group">
                    <label htmlFor="password" className="update-user-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        className="update-user-input"
                    />
                </div>

                <button type="submit" className="update-user-submit">Update User</button>
            </form>
        </div>);
}

export default UpdateUserForm;
