import { convertToJson } from './utils.mjs';

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
    constructor() {
    }

    async getData(category) {
        const response = await fetch(`${baseURL}products/search/${category} `);
        console.log(response);
        const data = await convertToJson(response);
        console.log(data);
        return data.Result;
    }

    async findProductById(id) {
        const response = await fetch(`${baseURL}product/${id}`);
        const data = await convertToJson(response);
        return data.Result;
    }
}
