import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard'; // Adjust the path according to your project structure
import logo from './logo.png'

function App() {
  
  useEffect(() => {
    // Set the data-theme attribute to "dark" on the html element
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);
    return (
    <header>
      <Router>
        <nav>
          <img src={logo} alt="Logo" className="navbar-logo" />

          <ul>
            <li><Link to="/dashboard">Principal</Link></li>
            <li><Link to="/tasks">Posts</Link></li>
            <li><Link to="/penalty">Evenement</Link></li>

            {/* more links */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />


          {/* more routes */}
        </Routes>
      </Router>
    </header>
  
  );
  
}
export default App;

