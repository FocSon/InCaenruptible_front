import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import logo from "../imgs/logo.png";
import Posts from "./Posts";

import Events from "./Events/Events";
import Home from "./Home";

function Navbar() {
    return (
        <Router>
            <nav>
                <img src={logo} alt="Logo" className="navbar-logo" />

                <ul>
                    <li><Link to="*">Principal</Link></li>
                    <li className='center'><Link to="/posts">Posts</Link></li>
                    <li className='right'><Link to="/events">Evenements</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/events" element={<Events />} />
            </Routes>
        </Router>
    );
}

export default Navbar;
