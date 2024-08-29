import {useEffect, useState} from "react";
import {getAllUsers} from "../../api-calls/user-calls";
import LoadingPage from "../loading-page";
import "../../Styles/user-list.css"

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((r) => setUsers(r));
    }, []);

    return (
        <div>{users.length ? <table className="user-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Admin</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            : <LoadingPage></LoadingPage>}

        </div>
    )
}

export default UserList;