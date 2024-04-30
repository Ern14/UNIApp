import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerUsuarios = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/obtenerUsuarios`);
        console.log(response)
        return response.data.datos;
    } catch (error) {
        throw error.response.data;
    }

}

