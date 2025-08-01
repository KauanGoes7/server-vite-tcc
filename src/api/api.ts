// src/api/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5555', // URL do seu backend.
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;