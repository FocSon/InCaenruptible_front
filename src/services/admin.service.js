import axios from 'axios';
import {API_URL} from './path';

export const setMainAlert = async (id) => axios.post(`${API_URL}setMainAlert`, {
    id,
})
    .then((res) => res.data)
    .catch((err) => err.response.data.errorMessage);

export const refuseRequest = async (id) => axios.post(`${API_URL}refuseRequest`, {
    id,
})
    .then((res) => res.data)
    .catch((err) => err.response.data.errorMessage);

export const acceptRequest = async (id, title = undefined, description= undefined, category= undefined) => axios.post(`${API_URL}acceptRequest`, {
    id,
    title,
    description,
    category,
})
    .then((res) => res.data)
    .catch((err) => err.response.data.errorMessage);

export const deleteAlert = async (id) => axios.post(`${API_URL}deleteAlert`, {
    id,
})
    .then((res) => res.data)
    .catch((err) => err.response.data.errorMessage);

export const endAlert = async (id, message= undefined) => axios.post(`${API_URL}endAlert`, {
    id,
    message
})
    .then((res) => res.data)
    .catch((err) => err.response.data.errorMessage);

export const updateAlert = async (id, title= undefined, description= undefined, category= undefined) => axios.post(`${API_URL}updateAlert`, {
    id,
    title,
    description,
    category
})
    .then((res) => res.data)
    .catch((err) => err.response.data.errorMessage);
