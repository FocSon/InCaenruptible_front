import RequestAlert from '../model/RequestAlert';
import Cookies from 'js-cookie';
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import {Alert} from "../model/Alert";

class HomeService {
    // URL_ADDR = "192.93.212.217:8080/";
    URL_ADDR = "localhost:8080/";

    alertAwaitingConfirmation = false;
    alertPresent = false;
    alertConfirmed = false;

    currentAlert = undefined;

    socket = undefined;

    async fetchAlertPresent() {
        const response = await fetch(
            "http://" + this.URL_ADDR + "api/alertsDone?n=10&startId=undefined",
            {method: 'GET'}
        );

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const resJson = await response.json();

        console.log(resJson);

        this.alertPresent = resJson.listAlert.length > 0;
        this.currentAlert = this.alertPresent ? resJson.listAlert[resJson.listsAlert.length - 1] : undefined;
        console.log(this.currentAlert)
    }

    launchWebSocketStream() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            const video = document.getElementById('webcamVideo');
            video.srcObject = stream;

            if(this.socket === undefined)
            {
                this.initSocket();
            }

            this.socket.emit('streamData', {
                data: undefined,
                token: Cookies.get('token'),
            });

            let mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs=vp9',
            });

            mediaRecorder.start(1000);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 100000) {
                    this.socket.emit('streamData', {
                        data: event.data,
                        token: Cookies.get('token'),
                    });

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

        const that = this;
        socket.on('emitter:alertAccepted', function (event) {
            console.log('Stream accepté');

            Cookies.set('token', event.token, { expires: 1 * 24 * 60 * 60});
            this.alertConfirmed = true;

            that.currentAlert = new Alert(event.alertId);

            that.watchAlert(that, that.socket, event.alertId);
        });
    }

    watchAlert(that = this, socket = that.socket, alertId = that.currentAlert.id) {
        socket.emit('watchAlert', { id: alertId });

        socket.on(`streamData`, function (event) {
            console.log(event);

            const blob = new Blob([event.data], { type: 'video/webm; codecs=vp9' });
            const url = URL.createObjectURL(blob);
            const video = document.getElementById('remoteVideo');
            video.src = url;
        });
    }

    async createAlert(type, category, title, description) {
        const payload = new RequestAlert(type, category, title, description, undefined);

        const fullUrl = "http://" + this.URL_ADDR + "api/requestAlert";

        try {
            const response = await fetch(fullUrl, {
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

    initSocket() {
        this.socket = io('ws://' + this.URL_ADDR);
        this.registerSocketEvents(this.socket);
    }
}

export default HomeService;