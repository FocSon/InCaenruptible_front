import React, {useEffect} from 'react';
import './HandleAlerts.css';
import loginService from '../../services/login.service';
import {socket} from '../../sockets';
import {acceptRequest, deleteAlert, endAlert, refuseRequest, setMainAlert} from '../../services/admin.service';
import {background} from '@chakra-ui/styled-system';

const HandleAlerts = () => {
    const [requests, setRequests] = React.useState([]);
    const [alerts, setAlerts] = React.useState([]);
    const [mainId, setMainId] = React.useState(null);

    useEffect(() => { // Call once when component is mounted
        if (loginService.isLoggedIn === false) {
            return;
        }

        socket.on('admin:init', (data) => {
            setRequests(data.requests);
        });

        socket.on('admin:newRequest', (data) => {
            setRequests((requests) => [...requests, data.request]);
        });

        socket.on('admin:requestDeleted', (data) => {
            setRequests((requests) => requests.filter((request) => request.requestId !== data.requestId));
        });

        socket.on('init', (data) => {
            setAlerts(data.alerts);
            setMainId(data.mainAlertId);
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

        socket.on('setMainAlert', (data) => {
            setMainId(data.id);
        });

        socket.emit('admin:startAdminSession', {
            token: window.localStorage.getItem('token'),
        });

        return () => { // Call when component is unmounted
            socket.emit('admin:endAdminSession', {
                token: window.localStorage.getItem('token'),
            });

            socket.off('admin:init');
            socket.off('admin:newRequest');
            socket.off('admin:requestDeleted');
            socket.off('init');
            socket.off('newAlert');
            socket.off('deleteAlert');
            socket.off('alertDone');
        };
    }, []);
    if (loginService.isLoggedIn === false) {
        return (
            <h2 className="handle-alerts">Seuls les admins sont autorisés ici</h2>
        );
    }

    return (
        <div className="handle-alerts">
            <div>
                <h2>Demandes</h2>
                <div className={'requests'}>
                    {
                        requests.map((request, index) => {
                            return (
                                <div key={index} className={'request'}>
                                    <div>
                                        <h3>{request.title}</h3>
                                        <p>{request.description}</p>
                                    </div>
                                    <div className={'request-buttons'}>
                                        <button
                                            style={{backgroundColor: 'blue'}}
                                            onClick={async () => {
                                            await acceptRequest(request.requestId);
                                        }}/>
                                        <button
                                            style={{backgroundColor: 'red'}}
                                            onClick={async () => {
                                            await refuseRequest(request.requestId);
                                        }}/>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div>
                <h2>Alertes en cours</h2>
                <div className={'alerts'}>
                    {
                        alerts.map((alert, index) => {
                            return (
                                <div key={index} className={'alert'}>
                                    <div>
                                        <h3
                                            style={mainId && mainId === alert.id ? {color: 'red'} : {}}
                                        >{alert.title}</h3>
                                        <p>{alert.description}</p>
                                    </div>
                                    <div className={'alert-buttons'}>
                                        <button onClick={async () => {
                                            await setMainAlert(alert.id)
                                        }}>Principale
                                        </button>
                                        <button onClick={async () => {
                                            await endAlert(alert.id, 'L\'alerte a été terminée par l\'administrateur')
                                        }}>Terminer
                                        </button>
                                        <button onClick={async () => {
                                            await deleteAlert(alert.id)
                                        }}>Supprimer
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
    //Dans Demandes
    //ajouter les boutons pour accepter et refuser
    //Quand on accepte ou refuse
    //api/acceptAlert ou refuseAlert (POST)


    //Dans Alertes en cours
    //comment récupérer les alertes acceptées ? base de données ?
    //pour chaque alerte ajouter bouton "définir comme alerte principale", "marquer comme terminée", "supprimer alerte", "modifier"
    //pour chaque bouton, utiliser api/setMainAlert, api/deleteAlert, api/endAlert et "api/updateAlert" (POST)

    //...admin/watchRequest, admin:stopWatchRequest, admin:streamRequestData??

    //où mettre admin:endAdminSession??????
};

export default HandleAlerts;
