import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerRoles = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/roles/obtenerRoles`);
        return response.data.datos;
    } catch (error) {
        throw error.response.data;
    }

};