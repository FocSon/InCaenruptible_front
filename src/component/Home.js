import React from 'react';
import VideoPlayer from './VideoPlayer';

const Home = () => {
    return (
        <main className='content bodyColor'>
        <VideoPlayer length={40} url="https://www.youtube.com/watch?v=Rq5SEhs9lws&ab_channel=Skillthrive"/>
        </main>
    );
};

export default Home;