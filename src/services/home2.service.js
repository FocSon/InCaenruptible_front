import Cookies from 'js-cookie';
vimport * as alertService from './alert.service';
import {WS_URL} from './path';
import {Alert} from '../model/Alert';

class HomeService {
    alertAwaitingConfirmation = false;
    alertPresent = false;
    alertConfirmed = false;

    homeComponentRefresh = undefined;

    currentAlert = undefined;

    socket = undefined;

    constructor(homeComponentRefresh) {
        this.homeComponentRefresh = homeComponentRefresh;
    }

    setAlertConfirmed(alertConfirmed) {
        this.alertConfirmed = alertConfirmed;
        this.homeComponentRefresh();
    }

    setAlertAwaitingconfirmation(alertAwaitingConfirmation) {
        this.alertAwaitingConfirmation = alertAwaitingConfirmation;
        this.homeComponentRefresh();
    }

    setAlertPresent(alertPresent) {
        this.alertPresent = alertPresent;
        this.homeComponentRefresh();
    }

    async fetchAlertPresent() {
        let alerts = (await alertService.getAlertsDone()).listAlert;

        console.log(alerts);

        alerts.filter((x) => x.category === 'video');
        this.setAlertPresent(alerts.length > 0);

        if (this.alertPresent) {
            this.currentAlert = this.alertPresent ? alerts[0] : undefined;

            this.initSocket();
            this.watchAlert(this);
        }

        return this.currentAlert;
    }

    closeWebSocketStream() {
        this.socket.emit('stopStream', {token: Cookies.get('token')});
        this.setAlertConfirmed(false);
        this.fetchAlertPresent();
    }

    launchWebSocketStream() {
        console.log('streaming');
        navigator.mediaDevices
            .getUserMedia({video: {width: 640, height: 480}, audio: true})
            .then((stream) => {
                const video = document.getElementById('webcamVideo');
                video.srcObject = stream;

                if (this.socket === undefined) {
                    this.initSocket();
                }

                console.log(Cookies.get('token'));

                this.socket.emit('streamData', {
                    data: undefined,
                    token: Cookies.get('token'),
                });

                let mimeType = 'video/webm; codecs=vp9'; // Default MIME type
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = 'video/mp4; codecs=avc1'; // Fallback MIME type
                    if (!MediaRecorder.isTypeSupported(mimeType)) {
                        console.error('No supported MIME type found for MediaRecorder');
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
                    let mediaRecorder = new MediaRecorder(stream, {mimeType});

                    mediaRecorder.start(2000);

                    mediaRecorder.ondataavailable = (event) => {
                        mediaRecorderConsumer(event);
                        mediaRecorder.stop();
                    };
                }, 1950);
            });
    }

    registerSocketEvents(socket) {
        const that = this;

        socket.on('emitter:alertRefused', function (event) {
            socket.send('Stream refusé');
            socket.close();
            that.setAlertConfirmed(false);
        });

        socket.on('emitter:alertDone', function (event) {
            socket.send('Stream terminé');
            socket.close();
            that.setAlertConfirmed(false);
        });

        socket.on('emitter:alertAccepted', function (event) {
            console.log('Stream accepté');

            Cookies.set('token', event.token, {expires: 1 * 24 * 60 * 60});
            that.setAlertConfirmed(true);

            that.currentAlert.id = event.alertId;

            that.watchAlert(that, that.socket, event.alertId);
        });
    }

    watchAlert(that = this, socket = that.socket, alertId = that.currentAlert.id) {
        socket.emit('watchAlert', {id: alertId});

        socket.on(`streamAlertData`, function (event) {
            console.log(event);

            const video = document.getElementById('remoteVideo');

            if (video) {
                const blob = new Blob([event.data], {type: 'video/webm; codecs=vp9'});
                const url = URL.createObjectURL(blob);
                video.src = url;
            }
        });
    }

    async createAlert(type, category, title, description) {
        try {
            const token = (await alertService.requestAlert(title, description, type, category)).token;
            Cookies.set('token', token, {expires: 1 * 24 * 60 * 60});
        } catch (e) {
            console.log(e);
            console.log('Error while creating alert');
            this.setAlertAwaitingconfirmation(false);
            return;
        }

        this.currentAlert = new Alert(-1, type, category, title, description);
        this.setAlertAwaitingconfirmation(true);

        try {
            this.launchWebSocketStream();
        } catch (e) {
            console.log(e);
            console.log('Error while opening websocket');
            this.setAlertAwaitingconfirmation(false);
        }
    }

    initSocket() {
        this.socket = io(WS_URL);
        this.registerSocketEvents(this.socket);
    }
}

export default HomeService;
