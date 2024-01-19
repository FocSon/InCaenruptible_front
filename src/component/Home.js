import {useEffect, useMemo, useRef, useState} from 'react';
import CreateAlertForm from './CreateAlertForm';
import {socket} from '../sockets';
import './Home.css';
import StreamVideoFrame from './StreamVideoFrame';

const Home = () => {
    const [alerts, setAlerts] = useState([]);
    const [mainAlertId, setMainAlertId] = useState(null);
    const videoRef = useRef(null);

    const mainAlert = useMemo(() => {
        return alerts.find((alert) => alert.id === mainAlertId);
    }, [alerts, mainAlertId]);

    useEffect(() => {
        socket.on('init', function (event) {
            setAlerts(event.alerts);
            setMainAlertId(event.mainAlertId);
            console.log(event);
        });

        socket.emit('askInit', {});

        socket.on('setMainAlert', (data) => {
            setMainAlertId(data.id);
        });

        socket.on('newAlert', (data) => {
            setAlerts((alerts) => [...alerts, data.alert]);
        });

        socket.on('deleteAlert', (data) => {
            setAlerts((alerts) => alerts.filter((alert) => alert.id !== data.id));
        });

        socket.on('alertDone', (data) => {
            setAlerts((alerts) => alerts.filter((alert) => alert.id !== data.id));
        });

        return () => {
            socket.off(`init`);
            socket.off(`setMainAlert`);
            socket.off(`newAlert`);
            socket.off(`deleteAlert`);
            socket.off(`alertDone`);
        };
    }, []);

    useEffect(() => {
        if (!mainAlertId) return;

        socket.emit('watchAlert', {id: mainAlertId});

        socket.on(`streamAlertData`, function (event) {
            const video = videoRef.current;

            if (video) {
                const blob = new Blob([event.data], {type: 'video/webm; codecs=vp9'});
                video.src = URL.createObjectURL(blob);
            }
        });

        return () => {
            socket.off(`streamAlertData`);
            socket.emit('stopWatchAlert', {id: mainAlertId});
        };
    }, [mainAlertId]);

    return (
        <>
         <main className="content bodyColor ">
            {
                mainAlert ? (
                    <div style={{color:"white"}}>
                        <StreamVideoFrame streamId={mainAlert.id}/>
                        <h1>{mainAlert.title}</h1>
                        <h4>{mainAlert.description}</h4>
                    </div>
                ) : <p style={{color:"white"}}>Pas d'alerte</p>
            }
            <div className="alertButton">
                <CreateAlertForm/>
            </div>

            </main>
        </>
    );
};

export default Home;
