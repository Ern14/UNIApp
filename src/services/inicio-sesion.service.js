import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const login = async (body) => {
    try {
        const response = await axios.post(`${enviroment.localhost}/auth/login`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const verificarToken = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/auth/verificarToken`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
