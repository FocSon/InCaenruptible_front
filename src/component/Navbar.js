import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import logo from "../imgs/logo.png";
import Dashboard from "../Dashboard";
import Posts from "../Posts";



function Navbar() {
    return (
        <Router>
            <nav>
                <img src={logo} alt="Logo" className="navbar-logo" />

                <ul>
                    <li><Link to="*">Principal</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/events">Evenements</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/posts" element={<Posts />} />
            </Routes>
        </Router>
    );
}

export default Navbar;
