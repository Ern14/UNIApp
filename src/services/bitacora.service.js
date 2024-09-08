import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerBitacora = async (idDepartamento,idAsignatura) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/asistencias/obtenerAsistencias/${idDepartamento}/${idAsignatura}`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};