import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getUser, updateUser} from "../api-calls/user-calls";
import userStorage from "../storage/user-stores/user-storage";

function UpdateUserForm() {
    const {userId} = useParams(); // Get the user ID from the URL
    const userStore = userStorage();
    const [user, setUser] = useState({
        _id: '',
        name: '',
        username: '',
        email: '',
        password: '',
    });

    // Fetch the user details when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUser(userId);
                setUser(fetchedUser);
                console.log(fetchedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setUser({
            ...user,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('User updated:', user);
        try {
            await updateUser(userId, user).then(() => {
                userStore.setUser(user)
            });
            // Redirect or show a success message
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label><br/>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="username">Username:</label><br/>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label><br/>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label><br/>
                    <input
                        className="mb-4"
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>


                <button type="submit">Update User</button>
            </form>
        </div>
    );
}

export default UpdateUserForm;
