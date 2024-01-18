import RequestAlert from '../model/RequestAlert';
import Cookies from 'js-cookie';
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

class HomeService {
    alertAwaitingConfirmation = false;
    alertPresent = false;
    alertConfirmed = false;

    streamId = undefined;

    async fetchAlertPresent() {
        this.alertPresent = false;
    }

    launchWebSocketStream() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            const video = document.getElementById('webcamVideo');
            video.srcObject = stream;

            const socket = io('ws://localhost:8080/');
            this.registerSocketEvents(socket);
            socket.emit('streamData', {
                data: undefined,
                token: Cookies.get('token'),
            });

            let mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs=vp9',
            });

            mediaRecorder.start(1000);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 100000) {
                    socket.emit('streamData', {
                        data: event.data,
                        token: Cookies.get('token'),
                    });

                    // const blob = new Blob([event.data], { type: 'video/webm; codecs=vp9' });
                    // const url = URL.createObjectURL(blob);
                    // const video = document.getElementById('remoteVideo');
                    // video.src = url;

                    mediaRecorder.stop();

                    const callback = mediaRecorder.ondataavailable;

                    mediaRecorder = new MediaRecorder(stream, {
                        mimeType: 'video/webm; codecs=vp9',
                    });

                    mediaRecorder.start(1000);

                    mediaRecorder.ondataavailable = callback;
                }
            };
        });
    }

    registerSocketEvents(socket) {
        socket.on('emitter:alertRefused', function (event) {
            socket.send('Stream refusé');
            socket.close();
            this.alertConfirmed = false;
        });

        socket.on('emitter:alertDone', function (event) {
            socket.send('Stream terminé');
            socket.close();
            this.alertConfirmed = false;
        });

        socket.on('emitter:alertAccepted', function (event) {
            console.log('Stream accepté');

            Cookies.set('token', event.token, { expires: 1 * 24 * 60 * 60});
            this.alertConfirmed = true;

            console.log(event);

            socket.emit('watchAlert', { id: event.alertId });

            socket.on(`streamData`, function (event) {
                console.log(event);

                const blob = new Blob([event.data], { type: 'video/webm; codecs=vp9' });
                const url = URL.createObjectURL(blob);
                const video = document.getElementById('remoteVideo');
                video.src = url;
            });

            //TODO appel watchalert avec l'id de l'alerte contenu dans l'event
            //
            // const blob = new Blob([event.data], { type: 'video/webm; codecs=vp9' });
            // const url = URL.createObjectURL(blob);
            // const video = document.getElementById('remoteVideo');
            // video.src = url;
            // console.log(url);
        });
    }

    async createAlert(type, category, title, description) {
        const payload = new RequestAlert(type, category, title, description, undefined);

        const url = 'http://localhost:8080/api/requestAlert';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const resJson = await response.json();
            Cookies.set('token', resJson.token, { expires: 1 * 24 * 60 * 60});
        } catch (e) {
            console.log(e);
            console.log("Error while creating alert");
            this.alertAwaitingConfirmation = false;
            return;
        }

        this.alertAwaitingConfirmation = true;

        try {
            this.launchWebSocketStream();
        } catch (e) {
            console.log(e);
            console.log("Error while opening websocket");
            this.alertAwaitingConfirmation = false;
        }
    }
}

export default HomeService;