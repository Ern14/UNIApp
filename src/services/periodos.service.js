import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerPeridos = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/periodos/obtenerPeriodos`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};