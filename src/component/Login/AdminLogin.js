import React from 'react';
import './AdminLogin.css'
import loginService from '../../services/login-service';

const AdminLogin = () => {

    const handlesubmit = (values) => {
        loginService.login(values.username, values.password);
    }

    const logoutCall = () => {
        loginService.logout();
    }

    if(loginService.isLoggedIn === true){
        console.log(loginService.isLoggedIn);
        return (
            <form className="login-form" onSubmit={handlesubmit}>
                <input type="text" placeholder="Username" required/>
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        );
    }
    else{
        console.log(loginService.isLoggedIn);                               
        return (
            <div className="logout-text">
                <h2>You are logged in</h2>
                <button onClick={logoutCall}>logout</button>     
            </div>
        );
    }
    
};

export default AdminLogin;