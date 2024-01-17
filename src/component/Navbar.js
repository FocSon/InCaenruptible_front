import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import logo from "../imgs/logo.png";
import Home from "./Home";
import PostFeed from "./PostFeed";
import Events from "./Events";
import './Navbar.css';

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
                <Route path="*" element={<Home />} />
                <Route path="/posts" element={<PostFeed />} />
                <Route path="/events" element={<Events />} />
            </Routes>
        </Router>
    );
}

export default Navbar;
