import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerUsuarios = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/obtenerUsuarios`);
        return response.data.datos;
    } catch (error) {
        throw error.response.data;
    }

}

export const eliminarUsuarios = async (idUsuario) => {
    try {
        const data = {
            IdUsuario: idUsuario,
        };
        const response = await axios.delete(`${enviroment.localhost}/eliminarUsuarios`, { data });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }

}

