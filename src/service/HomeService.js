import RequestAlert from '../model/RequestAlert';
import Cookies from 'js-cookie';

function openWebSocket() {
    const socket = new WebSocket('ws://localhost:8080');

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
        /*
        event = {
            requestId,
            token,
            alertId
        }
         */
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

        Cookies.set("requestStreamToken", response.token, { expires: 1 * 24 * 60 * 60 }); //Cookie expire dans 24 heures
    } catch (e) {
        console.log(e);
        console.log("Error while creating alert");
        return false;
    }

    openWebSocket();

    return true;
}



export {createAlert}