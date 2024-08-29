import {Link} from "react-router-dom";
import React from "react";

const AdminPanel = () => {
    return (
        <div>
            <div className="mb-2 mt-5">
                <Link className="btn btn-primary col-2" to="/add-book">Add Book</Link>
            </div>
            <Link className="btn btn-primary col-2" to="/user-list">UserList</Link>

        </div>
    )
}
export default AdminPanel;