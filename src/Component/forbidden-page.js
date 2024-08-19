import React from 'react';
import '../Styles/forbidden.css';

const ForbiddenPage = () => {
    return (
        <div className="forbidden-container">
            <img
                src="https://media1.tenor.com/m/a4EZ53cd_doAAAAd/youre-not-getting-in-satan.gif"
                alt="Access Forbidden"
                className="forbidden-gif"
            />
            <h1>403 Forbidden</h1>
            <p>You do not have permission to access this page.</p>
        </div>
    );
};

export default ForbiddenPage;
