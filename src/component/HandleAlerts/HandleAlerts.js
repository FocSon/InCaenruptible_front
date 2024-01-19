import React, {useEffect} from 'react';
import './HandleAlerts.css';
import loginService from '../../services/login.service';
import {socket} from '../../sockets';
import {acceptRequest, deleteAlert, endAlert, refuseRequest, setMainAlert} from '../../services/admin.service';
import {Box, Button, Center, Flex, Heading, Text, VStack} from '@chakra-ui/react';
import {CheckIcon, CloseIcon, DeleteIcon, RepeatClockIcon, StarIcon} from '@chakra-ui/icons';
import StreamVideoFrame from '../StreamVideoFrame';

function addIsWatch(obj) {
    obj.isWatch = false;
    return obj;
}

const HandleAlerts = () => {
    const [requests, setRequests] = React.useState([]);
    const [alerts, setAlerts] = React.useState([]);
    const [mainId, setMainId] = React.useState(null);

    useEffect(() => { // Call once when component is mounted
        if (loginService.isLoggedIn === false) {
            return;
        }

        socket.on('admin:init', (data) => {
            setRequests(data.requests.map(addIsWatch));
        });

        socket.on('admin:newRequest', (data) => {
            setRequests((requests) => [...requests, addIsWatch(data.request)]);
        });

        socket.on('admin:requestDeleted', (data) => {
            setRequests((requests) => requests.filter((request) => request.requestId !== data.requestId));
        });

        socket.on('init', (data) => {
            setAlerts(data.alerts.map(addIsWatch));
            setMainId(data.mainAlertId);
        });

        socket.on('newAlert', (data) => {
            setAlerts((alerts) => [...alerts, addIsWatch(data.alert)]);
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
        <main className="content bodyColor ">
            <Box className="handle-alerts">
                <Box>
                    <Heading as="h2">Demandes</Heading>
                    <Box className="requests">
                        {requests.map((request, index) => (
                            <Box key={index} className="request">
                                <Heading as="h3" size="md">{request.title}</Heading>
                                <Text as="h4">{request.description}</Text>
                                {
                                    request.isWatch === true ?
                                        <StreamVideoFrame streamId={request.requestId} isRequest={true} onClick={() => {
                                            setRequests((requests) => requests.map((request) => {
                                                if (request.requestId === request.requestId) {
                                                    request.isWatch = false;
                                                }
                                                return request;
                                            }));
                                        }}/> :
                                        <Button colorScheme="blue" onClick={async () => {
                                            await setRequests((requests) => requests.map((request) => {
                                                if (request.requestId === request.requestId) {
                                                    request.isWatch = true;
                                                }
                                                return request;
                                            }));
                                        }}>Voir</Button>
                                }
                                <Flex justifyContent="flex-end">
                                    <VStack spacing={2}>
                                        <Center>
                                            <Button leftIcon={<CheckIcon/>} colorScheme="blue" onClick={async () => {
                                                await acceptRequest(request.requestId);
                                            }}/>
                                        </Center>
                                        <Center>
                                            <Button leftIcon={<CloseIcon/>} colorScheme="red" onClick={async () => {
                                                await refuseRequest(request.requestId);
                                            }}/>
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
                                <Heading as="h3" size="lg"
                                         color={mainId && mainId === alert.id ? 'red' : 'inherit'}>{alert.title}</Heading>
                                <Text as="h4">{alert.description}</Text>
                                {
                                    alert.isWatch === true ?
                                        <StreamVideoFrame streamId={alert.id} isRequest={false} onClick={() => {
                                            setAlerts((alerts) => alerts.map((alert) => {
                                                if (alert.id === alert.id) {
                                                    alert.isWatch = false;
                                                }
                                                return alert;
                                            }));
                                        }}/> :
                                        <Button colorScheme="blue" onClick={async () => {
                                            await setAlerts((alerts) => alerts.map((alert) => {
                                                if (alert.id === alert.id) {
                                                    alert.isWatch = true;
                                                }
                                                return alert;
                                            }));
                                        }}>Voir</Button>
                                }
                                <Flex justifyContent="flex-end">
                                    <VStack spacing={2}>
                                        <Button iconSpacing={0} size="lg" colorScheme="gray" onClick={async () => {
                                            await setMainAlert(alert.id);
                                        }}>
                                            <StarIcon w={6} h={6}/>
                                        </Button>
                                        <Button iconSpacing={0} size="lg" onClick={async () => {
                                            await endAlert(alert.id, 'L\'alerte a été terminée par l\'administrateur');
                                        }}>
                                            <RepeatClockIcon w={6} h={6}/>
                                        </Button>
                                        <Button iconSpacing={0} size="lg" colorScheme="gray" onClick={async () => {
                                            await deleteAlert(alert.id);
                                        }}>
                                            <DeleteIcon w={6} h={6}/>
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
};

export default HandleAlerts;
