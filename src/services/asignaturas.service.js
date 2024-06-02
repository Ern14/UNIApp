import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerAsignaturas = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/asignaturas/obtenerAsignaturas`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerAsignaturasxId = async (idAsignatura) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/asignaturas/filtrarAsignatura/${idAsignatura}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const filtrarAsignaturasxBusqueda = async (busqueda) => {
    try {
        const body = {
            Busqueda: busqueda
        };
        const response = await axios.post(`${enviroment.localhost}/asignaturas/filtrarAsignaturasxBusqueda`, body );
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarAsignaturas = async (modAsignatura) => {
    try {
        const body = {
            idPeriodo: modAsignatura.periodo,
            Nombre: modAsignatura.nombre
        };
        const response = await axios.post(`${enviroment.localhost}/asignaturas/insertarAsignatura`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarAsignaturas = async (modAsignatura) => {
    try {
        const body = {
            IdAsignatura: modAsignatura.idAsignatura,
            IdPeriodo: modAsignatura.periodo,
            Nombre: modAsignatura.nombre
        };
        const response = await axios.put(`${enviroment.localhost}/asignaturas/actualizarAsignatura`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarAsignaturas = async (idAsignatura) => {
    try {
        const data = {
            IdAsignatura: idAsignatura,
        };
        const response = await axios.delete(`${enviroment.localhost}/asignaturas/eliminarAsignatura`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};