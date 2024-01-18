import React from 'react';
import './AdminLogin.css'
import loginService from '../../services/login-service';

const AdminLogin = () => {

    const handlesubmit = () => {
        const usern = document.getElementById("username").value;
        const pwd = document.getElementById("password").value;
        loginService.login(usern, pwd);
    }

    const logoutCall = () => {
        loginService.logout();
    }

    if(loginService.isLoggedIn === false){
        return (
            <form className="login-form" onSubmit={handlesubmit}>
                <input type="text" placeholder="Username" id="username" required/>
                <input type="password" placeholder="Password" id="password" required/>
                <button type="submit">Login</button>
            </form>
        );
    }
    else{                               
        return (
            <div>
                 <div className="logout-text">
                    <h2 className='text-logged-in'>You are logged in</h2>
                </div>
                <div className="logout-text">
                    <button className='button-logout' onClick={logoutCall}>logout</button>    
                </div>
            </div>
           
        );
    }
    
};

export default AdminLogin;