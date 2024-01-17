import React from 'react';
import './AdminLogin.css'
import loginService from '../services/login-service';

const AdminLogin = () => {

    const handlesubmit = (values) => {
        loginService.login(values.username, values.password);

    }

    return (
        <form className="login-form" onSubmit={handlesubmit}>
            <input type="text" placeholder="Username" required/>
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default AdminLogin;