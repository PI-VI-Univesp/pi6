import axios from 'axios';

const api = axios.create({
    baseURL: 'https://qpapi.liquuid.me',
});

export default api;