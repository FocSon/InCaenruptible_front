import {useMemo, useState} from 'react';
import CreateAlertForm from './CreateAlertForm';
import './Home.css';

const Home = () => {
    const [alerts, setAlerts] = useState([]);
    const [mainAlertId, setMainAlertId] = useState(null);

    const mainAlert = useMemo(() => {
        return alerts.find((alert) => alert.id === mainAlertId);
    }, [alerts, mainAlertId]);

    return (
        <>
         <main className="content bodyColor ">
            {
                mainAlert ? (
                    <div>
                        <div className="video">
                            <video id="remoteVideo" width="640" height="480" autoPlay></video>
                        </div>
                        <h1>{mainAlert.title}</h1>
                        <h4>{mainAlert.description}</h4>
                    </div>
                ) : <p>Pas d'alerte</p>
            }
            <div className="alertButton">
                <CreateAlertForm/>
            </div>

            </main>
        </>
    );
};

export default Home;
