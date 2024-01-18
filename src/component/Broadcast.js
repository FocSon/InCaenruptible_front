import {Button} from '@chakra-ui/react';
import {useEffect, useRef} from 'react';
import {socket} from '../sockets';

const Broadcast = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        navigator.mediaDevices.getUserMedia({
            video: {
                width: 640, height: 480
            },
            audio: true
        }).then((stream) => {
            const video = videoRef.current;
            video.srcObject = stream;
        });

    }, [videoRef]);

    useEffect(() => {
        this.registerSocketEvents(this.socket);

        socket.on('emitter:alertRefused', function (event) {
            socket.send('Stream refusé');
            socket.close();
        });

        socket.on('emitter:alertDone', function (event) {
            socket.send('Stream terminé');
            socket.close();
        });

        socket.on('emitter:alertAccepted', function (event) {
            console.log('Stream accepté');

            localStorage.setItem('broadcastToken', event.token);

            //update and watch alert
        });

        return () => ({

        });
    }, []);

    function handleStopBroadcast() {
        localStorage.removeItem('broadcastToken');
        window.location.reload();
    }

    return (
        <>
            <video style={{
                height: "50vh"
            }} autoPlay ref={videoRef}></video>
            <Button onClick={handleStopBroadcast}>Arreter l'alerte</Button>
        </>
    );
};

export default Broadcast;
