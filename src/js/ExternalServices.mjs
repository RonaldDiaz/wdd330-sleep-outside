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
<<<<<<< HEAD:src/js/ProductData.mjs
        const normalizedBaseUrl = normalizeBaseUrl(baseURL);
        const response = await fetch(`${normalizedBaseUrl}products/search/${category}`);
=======
        const response = await fetch(`${baseURL}products/search/${category} `);
>>>>>>> 1b21f49feec4cffd66f1e11d916e9920796ceafd:src/js/ExternalServices.mjs
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
        const response = await fetch(`${baseURL}checkout/`, options);
        return await convertToJson(response);
    }
}


