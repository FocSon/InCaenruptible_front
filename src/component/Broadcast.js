import {Button} from '@chakra-ui/react';
import {useEffect, useRef} from 'react';
import {socket} from '../sockets';

const Broadcast = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        let interval = -1;
        let canceled = false;
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 640, height: 480
            },
            audio: true
        }).then((stream) => {
            if (canceled) return;

            const video = videoRef.current;
            video.srcObject = stream;

            let mimeType = 'video/webm; codecs=vp9'; // Default MIME type
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/mp4; codecs=avc1'; // Fallback MIME type
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    console.error('No supported MIME type found for MediaRecorder');
                }
            }

            socket.emit('streamData', {
                data: '',
                token: localStorage.getItem('broadcastToken'),
            });

            interval = setInterval(() => {
                let mediaRecorder = new MediaRecorder(stream, {mimeType});

                mediaRecorder.start(2000);

                const mediaRecorderConsumer = (event) => {
                    if (event.data.size > 100000) {
                        socket.emit('streamData', {
                            data: event.data,
                            token: localStorage.getItem('broadcastToken'),
                        });
                    }
                };

                mediaRecorder.ondataavailable = (event) => {
                    mediaRecorderConsumer(event);
                    mediaRecorder.stop();
                };
            }, 1950);
        });

        socket.on('emitter:alertRefused', function (event) {
            handleStopBroadcast();
        });

        socket.on('emitter:alertDone', function (event) {
            alert('Done');
            handleStopBroadcast();
        });

        socket.on('emitter:alertAccepted', function (event) {
            localStorage.setItem('broadcastToken', event.token);
        });

        return () => {
            canceled = true;
            socket.off('emitter:alertRefused');
            socket.off('emitter:alertDone');
            socket.off('emitter:alertAccepted');

            if (interval !== -1)
                clearInterval(interval);
        };
    }, [videoRef]);

    function handleStopBroadcast() {
        socket.emit('stopStream', {
            token: localStorage.getItem('broadcastToken')
        });
        localStorage.removeItem('broadcastToken');
        window.location.reload();
    }

    return (
        <>
            <video style={{
                height: '50vh'
            }} autoPlay ref={videoRef}></video>
            <Button onClick={handleStopBroadcast}>Arreter l'alerte</Button>
        </>
    );
};

export default Broadcast;
