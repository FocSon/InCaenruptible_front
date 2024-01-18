import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../imgs/logo.png';

function Navbar() {
    return (
        <nav>
            <img src={logo} alt="Logo" className="navbar-logo"/>

            <ul>
                <li><Link to="*">Principal</Link></li>
                <li className="center"><Link to="/posts">Posts</Link></li>
                <li className="right"><Link to="/events">Evenements</Link></li>
                {window.localStorage.getItem('token') !== null
                    && <li className="right"><Link to="/handle-alerts">Manager</Link></li>
                }
            </ul>
        </nav>
    );
}

export default Navbar;
