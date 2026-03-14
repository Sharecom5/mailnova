import axios from 'axios';

// To run locally, you may need to adjust this URL depending on your PHP server structure
// e.g. http://localhost/mailnova/backend/api
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/mailnova/backend/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
