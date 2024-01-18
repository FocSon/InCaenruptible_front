import {useMemo, useState} from 'react';
import CreateAlertForm from './CreateAlertForm';

const Home = () => {
    const [alerts, setAlerts] = useState([]);
    const [mainAlertId, setMainAlertId] = useState(null);

    const mainAlert = useMemo(() => {
        return alerts.find((alert) => alert.id === mainAlertId);
    }, [alerts, mainAlertId]);

    return (
        <>
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
        </>
    );
};

export default Home;
