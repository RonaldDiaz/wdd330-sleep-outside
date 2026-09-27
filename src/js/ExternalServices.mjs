import { convertToJson } from './utils.mjs';

const baseURL = import.meta.env.VITE_SERVER_URL || 'https://wdd330-backend-osp8.onrender.com/';
const SEARCH_CATEGORIES = ['tents', 'sleeping-bags', 'backpacks', 'hammocks'];

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

    async searchProducts(query) {
        const trimmedQuery = (query || '').trim();
        if (!trimmedQuery) return [];

        const normalizedBaseUrl = normalizeBaseUrl(baseURL);
        const encodedQuery = encodeURIComponent(trimmedQuery);

        try {
            const response = await fetch(`${normalizedBaseUrl}products/search/${encodedQuery}`);
            const data = await convertToJson(response);
            const directResults = Array.isArray(data.Result) ? data.Result : [];
            if (directResults.length) return directResults;
        } catch (error) {
            // Some API responses do not support arbitrary term searches.
        }

        const categoryResults = await Promise.all(
            SEARCH_CATEGORIES.map(async (category) => {
                try {
                    const response = await fetch(`${normalizedBaseUrl}products/search/${category}`);
                    const data = await convertToJson(response);
                    return Array.isArray(data.Result) ? data.Result : [];
                } catch (error) {
                    return [];
                }
            })
        );

        const normalizedSearch = trimmedQuery.toLowerCase();
        return categoryResults
            .flat()
            .filter((product) => {
                const productName = (product.NameWithoutBrand || product.Name || '').toLowerCase();
                const brandName = (product.Brand && product.Brand.Name ? product.Brand.Name : '').toLowerCase();
                return productName.includes(normalizedSearch) || brandName.includes(normalizedSearch);
            });
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


