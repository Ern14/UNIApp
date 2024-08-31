import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerDocenteAsignatura = async (idAsignatura) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/operaciones/obtenerDocenteAsignatura/${idAsignatura}`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerDocenteAsignaturaxId = async (idDocenteAsignatura) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/operaciones/filtrarDocenteAsignaturaxId/${idDocenteAsignatura}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarDocenteAsignatura = async (modDocenteAsignatura) => {
    try {
        const body = {
            idDocente: modDocenteAsignatura.docente,
            idAsignatura: modDocenteAsignatura.idAsignatura
        };
        const response = await axios.post(`${enviroment.localhost}/operaciones/insertarDocenteAsignatura`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarDocenteAsignatura = async (modDocenteAsignatura) => {
    try {
        const body = {
            idDocenteAsignatura: modDocenteAsignatura.idDocenteAsignatura,
            idDocente: modDocenteAsignatura.docente,
            idAsignatura: modDocenteAsignatura.idAsignatura
        };
        const response = await axios.put(`${enviroment.localhost}/operaciones/actualizarDocenteAsignatura`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarDocenteAsignatura = async (idDocenteAsignatura) => {
    try {
        const data = {
            idDocenteAsignatura: idDocenteAsignatura,
        };
        const response = await axios.delete(`${enviroment.localhost}/operaciones/eliminarDocenteAsignatura`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};