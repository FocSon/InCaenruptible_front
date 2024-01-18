import React, {useEffect} from 'react';
import Navbar from './component/Navbar';
import {css, Global} from '@emotion/react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './component/Home';
import Posts from './component/Posts';
import Events from './component/Events/Events';
import AdminLogin from './component/Login/AdminLogin';
import HandleAlerts from './component/HandleAlerts/HandleAlerts';
import Broadcast from './component/Broadcast';

function App() {
    useEffect(() => {
        // Set the data-theme attribute to "dark" on the html element
        document.documentElement.setAttribute('data-theme', 'light');
    }, []);

    const isBroadcasting = localStorage.getItem('broadcastToken') !== null;

    return (
        <>
            <Global
                styles={css`
                    html, body {
                        margin: 0;
                        padding: 0;
                        height: 100%; /* Full height */
                        
                        background-color: var(--main-bg-color);
                    }

                    #root {
                        min-height: 100%; /* Full height */
                        display: flex;
                        flex-direction: column;
                    }
                `}
            />
            <Router>
                <Navbar/>

                <Routes>
                    <Route path="*" element={isBroadcasting
                        ? <Broadcast/>
                        : <Home/>
                    }/>
                    <Route path="/posts" element={<Posts/>}/>
                    <Route path="/events" element={<Events/>}/>
                    <Route path="/admin-login" element={<AdminLogin/>}/>
                    <Route path="/handle-alerts" element={<HandleAlerts/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
