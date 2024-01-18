import React, {useEffect} from 'react';
import Navbar from './component/Navbar';
import {css, Global} from '@emotion/react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './component/Home';
import Posts from './component/Posts';
import Events from './component/Events/Events';
import AdminLogin from './component/Login/AdminLogin';
import HandleAlerts from './component/HandleAlerts/HandleAlerts';

function App() {
    useEffect(() => {
        // Set the data-theme attribute to "dark" on the html element
        document.documentElement.setAttribute('data-theme', 'light');
    }, []);
    return (
        <>
            <Global
                styles={css`
                    html, body {
                        margin: 0;
                        padding: 0;
                        height: 100%; /* Full height */
                        width: 100%; /* Full width */
                        display: flex;
                        flex-direction: column;
                        background-color: var(--main-bg-color);
                    }

                    #root {
                        height: 100%; /* Full height */
                        display: flex;
                        flex-direction: column;
                    }
                `}
            />
            <Router>
                <Navbar/>

                <Routes>
                    <Route path="*" element={<Home/>}/>
                    <Route path="/posts" element={<Posts/>}/>
                    <Route path="/events" element={<Events/>}/>
                    <Route path="/admin-login" element={<AdminLogin/>}/>
                    <Route path="/handle-alerts" element={<HandleAlerts/>}/>
                </Routes>
            </Router> //it is not required to have a login button as only the admin will use it
        </>
    );
}

export default App;
