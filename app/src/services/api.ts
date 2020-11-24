import axios from 'axios';

const api = axios.create({
    baseURL: 'http://165.22.15.197:3333',
});

export default api;