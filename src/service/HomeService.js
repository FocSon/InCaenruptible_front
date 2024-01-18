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

        let alerts = resJson.listAlert;

        alerts.filter((x) => x.category === 'video')
        this.alertPresent = alerts.length > 0;
        this.currentAlert = this.alertPresent ? alerts[0] : undefined;
    }

    launchWebSocketStream() {
        navigator.mediaDevices.getUserMedia({ video: {width:640, height:480}, audio: true }).then((stream) => {
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

            let mimeType = "video/webm; codecs=vp9"; // Default MIME type
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = "video/mp4; codecs=avc1"; // Fallback MIME type
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    console.error("No supported MIME type found for MediaRecorder");
                    return;
                }
            }


            const mediaRecorderConsumer = (event) => {
                if (event.data.size > 100000) {
                    this.socket.emit('streamData', {
                        data: event.data,
                        token: Cookies.get('token'),
                    });
                }
            };

            setInterval(() => {
                let mediaRecorder = new MediaRecorder(stream, { mimeType });

                mediaRecorder.start(2000);

                mediaRecorder.ondataavailable = (event) => {
                    mediaRecorderConsumer(event);
                    mediaRecorder.stop();
                }
            }, 2000);
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

            that.currentAlert.id = event.alertId;

            that.watchAlert(that, that.socket, event.alertId);
        });
    }

    watchAlert(that = this, socket = that.socket, alertId = that.currentAlert.id) {
        socket.emit('watchAlert', { id: alertId });

        socket.on(`streamAlertData`, function (event) {
            console.log(event)

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

        this.currentAlert = new Alert(-1, type, category, title, description)
    }

    initSocket() {
        this.socket = io('ws://' + this.URL_ADDR);
        this.registerSocketEvents(this.socket);
    }
}

export default HomeService;
