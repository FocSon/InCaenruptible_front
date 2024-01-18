import axios from 'axios';
import {API_URL} from './path';

export const requestAlert = async (title, description, type, category) => axios.post(`${API_URL}requestAlert`, {
    title,
    description,
    type,
    category,
}).then((res) => {
    const {requestId, token} = res.data;
    if (requestId !== undefined && token) {
        return {
            requestId,
            token,
        };
    }
    return res.data;
}).catch((err) => err.response.data.errorMessage);

export const getAlertsDone = async () => axios.get(`${API_URL}alertsDone`)
    .then((res) => res.data)
    .catch((err) => err.response.data.errorMessage);

export const getPosts = async () => axios.get(`${API_URL}posts`)
    .then((res) => res.data)
    .catch((err) => err.response.data.errorMessage);

export const getPostById = async (id) => axios.get(`${API_URL}post/${id}`)
    .then((res) => res.data)
    .catch((err) => err.response.data.errorMessage);
