import React, {useEffect} from 'react';
import './HandleAlerts.css';
import loginService from '../../services/login.service';
import {socket} from '../../sockets';
import {acceptRequest, deleteAlert, endAlert, refuseRequest} from '../../services/admin.service';
import {background} from '@chakra-ui/styled-system';
import { Box, Button, Heading, Text, VStack, Center, Flex } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, StarIcon, RepeatClockIcon, DeleteIcon } from '@chakra-ui/icons';


const HandleAlerts = () => {
    const [requests, setRequests] = React.useState([]);
    const [alerts, setAlerts] = React.useState([]);
    const [mainAlertId, setMainAlertId] = React.useState(null);

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
            setMainAlertId(data.mainAlert);
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
            setMainAlertId(data.alert);
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
        <main className="content bodyColor ">
        <Box className="handle-alerts">
            <Box>
                <Heading as="h2">Demandes</Heading>
                <Box className="requests">
                    {requests.map((request, index) => (
                        <Box key={index} className="request">
                            <Heading as="h3" size="md">{request.title}</Heading>
                            <Text as="h4">{request.description}</Text>
                            <Flex justifyContent="flex-end">
                                <VStack spacing={2}>
                                    <Center>
                                        <Button leftIcon={<CheckIcon />} colorScheme="blue" onClick={async () => {
                                            await acceptRequest(request.requestId);
                                        }} />
                                    </Center>
                                    <Center>
                                        <Button leftIcon={<CloseIcon />} colorScheme="red" onClick={async () => {
                                            await refuseRequest(request.requestId);
                                        }} />
                                    </Center>
                                </VStack>
                            </Flex>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box>
                <Heading as="h2">Alertes en cours</Heading>
                <Box className="alerts">
                    {alerts.map((alert, index) => (
                        <Box key={index} className="alert">
                            <Heading as="h3" size="lg" color={mainAlertId && mainAlertId === alert.id ? "red" : "inherit"}>{alert.title}</Heading>
                            <Text as="h4">{alert.description}</Text>
                            <Flex justifyContent="flex-end">
                                <VStack spacing={2}>
                                    <Button iconSpacing={0}  size="lg" colorScheme="gray" onClick={async () => {
                                        await setMainAlertId(alert.id);
                                    }}>
                                        <StarIcon w={6} h={6} />
                                    </Button>
                                    <Button iconSpacing={0}  size="lg" onClick={async () => {
                                        await endAlert(alert.id, 'L\'alerte a été terminée par l\'administrateur');
                                    }}>
                                        <RepeatClockIcon w={6} h={6} />
                                    </Button>
                                    <Button iconSpacing={0}  size="lg" colorScheme="gray" onClick={async () => {
                                        await deleteAlert(alert.id);
                                    }}>
                                        <DeleteIcon w={6} h={6} />
                                    </Button>
                                </VStack>
                            </Flex>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
        </main>
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
