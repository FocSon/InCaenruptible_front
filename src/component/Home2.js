import React, {useEffect, useState} from 'react';
import './Home.css';
import Spinner from './Spinner';
import CreateAlertForm from './CreateAlertForm';
import HomeService from '../services/home2.service';
import {Button} from '@chakra-ui/react';

const Home = () => {
    const [alert, setAlert] = useState(null);
    const [forceRefresh, setForceRefresh] = useState(null);

    const homeService = new HomeService(setForceRefresh);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pAlert = await homeService.fetchAlertPresent();
                if (homeService.alertPresent) {
                    setAlert(pAlert);
                }
            } catch (error) {
                console.error('Error fetching alert:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="content bodyColor">
            {alert ? (
                <div>
                    <div className="video">
                        {homeService.alertConfirmed ? (
                            <video id="webcamVideo" width="640" height="480" autoPlay></video>
                        ) : (
                            <video id="remoteVideo" width="640" height="480" autoPlay></video>
                        )}
                    </div>
                    <h1>{alert.title}</h1>
                    <h4>{alert.description}</h4>
                </div>
            ) : (
                ''
            )}
            <div className="alertButton">
                {homeService.alertAwaitingConfirmation ? (
                    <Spinner text="Awaiting stream validation, don't leave the page ...."/>
                ) : (
                    <div>
                        {!homeService.alertConfirmed ? (
                            <CreateAlertForm homeService={homeService}/>
                        ) : (
                            <Button onClick={homeService.closeWebSocketStream}>Arreter l'alerte</Button>
                        )}
                        <div className="video">
                            <video id="webcamVideo" width="640" height="480" autoPlay></video>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
