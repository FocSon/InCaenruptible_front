import RequestAlert from '../model/RequestAlert';
import Cookies from 'js-cookie';

function openWebSocket() {
    const socket = new WebSocket('ws://localhost:8080');

    const interval = setInterval(() => {
        streamData(socket);
    }, 100);

    socket.addEventListener('alertRefused', function (event) {
        socket.send('Stream refusé');
        socket.close();
    });

    socket.addEventListener('alertDone', function (event) {
        socket.send('Stream terminé');
        socket.close();
    });

    socket.addEventListener('alertAccepted', function (event) {
        console.log('Stream accepté');

        Cookies.set("streamToken", event.token, { expires: 1 * 24 * 60 * 60 }); //Cookie expire dans 24 heures

        /*
        event = {
            requestId,
            token,
            alertId
        }
         */
    });
}

function streamData(socket) {
    socket.emit('streamData', {
       data: undefined,
       token: Cookies.get("streamToken")
    });
}

async function createAlert(type, category, title, description) {
    const payload = new RequestAlert(type, category, title, description, '');

    const url = '/api/requestAlert';

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

        Cookies.set("streamToken", response.token, { expires: 1 * 24 * 60 * 60 }); //Cookie expire dans 24 heures
    } catch (e) {
        console.log(e);
        console.log("Error while creating alert");
        return false;
    }

    openWebSocket();

    return true;
}



export {createAlert}