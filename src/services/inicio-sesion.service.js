import axios from 'axios';
import { enviroment } from '../environment/enviroment';

export const login = async (body) => {
    try {
        const response = await axios.post(`${enviroment.localhost}/auth/login`, body);
        return response.data.datos;
    } catch (error) {
        throw error.response.data;
    }
}
