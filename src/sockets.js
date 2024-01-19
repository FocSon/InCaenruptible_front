import {io} from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js';
import {SOCKET_URL} from './services/path';

const socket = io(SOCKET_URL);

export {
    io,
    socket
};
