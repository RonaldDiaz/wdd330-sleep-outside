import { convertToJson } from './utils.mjs';

const DEFAULT_BASE_URL = 'https://wdd330-backend-osp8.onrender.com/';
const baseURL = (import.meta.env && import.meta.env.VITE_SERVER_URL) || DEFAULT_BASE_URL;

function normalizeBaseUrl(url) {
    return url.endsWith('/') ? url : `${url}/`;
}

export default class ExternalServices {
    constructor() {
    }

    async getData(category) {
        const normalizedBaseUrl = normalizeBaseUrl(baseURL);
        const response = await fetch(`${normalizedBaseUrl}products/search/${category}`);
        const data = await convertToJson(response);
        return data.Result;
    }

    async findProductById(id) {
        const normalizedBaseUrl = normalizeBaseUrl(baseURL);
        const response = await fetch(`${normalizedBaseUrl}product/${id}`);
        const data = await convertToJson(response);
        return data.Result;
    }

    async checkout(payload) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };
        const normalizedBaseUrl = normalizeBaseUrl(baseURL);
        const response = await fetch(`${normalizedBaseUrl}checkout`, options);
        return await convertToJson(response);
    }
}


