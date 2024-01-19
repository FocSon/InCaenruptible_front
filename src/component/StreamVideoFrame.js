import {useEffect, useRef} from 'react';
import {socket} from '../sockets';

const StreamVideoFrame = ({streamId, isRequest = false, onClick}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (isNaN(streamId)) return;
        if (isRequest && !localStorage.getItem('token')) return;

        if (isRequest) {
            socket.on(`admin:streamRequestData`, function (data) {
                if (data.requestId !== streamId) return;
                const video = videoRef.current;

                if (video) {
                    const blob = new Blob([data.data], {type: 'video/webm; codecs=vp9'});
                    video.src = URL.createObjectURL(blob);
                }
            });

            socket.emit('admin:watchRequest', {
                requestId: streamId,
                token: localStorage.getItem('token'),
            });

            return () => {
                socket.off(`admin:streamRequestData`);
                socket.emit('admin:stopWatchRequest', {
                    requestId: streamId,
                    token: localStorage.getItem('token'),
                });
            };
        }

        socket.emit('watchAlert', {id: streamId});

        socket.on(`streamAlertData`, function (data) {
            console.log('streamAlertData', data);
            if (data.id !== streamId) return;
            const video = videoRef.current;

            if (video) {
                const blob = new Blob([data.data], {type: 'video/webm; codecs=vp9'});
                video.src = URL.createObjectURL(blob);
            }
        });

        return () => {
            socket.off(`streamAlertData`);
            socket.emit('stopWatchAlert', {id: streamId});
        };
    }, [streamId, isRequest]);

    return (
        <video
            style={{
                height: '50%'
            }}
            autoPlay
            ref={videoRef}
            onClick={onClick}
        ></video>
    );
};

export default StreamVideoFrame;
