import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerCarreraAsignatura = async (idCarrera) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/operaciones/obtenerCarreraAsignatura/${idCarrera}`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerCarreraAsignaturaxId = async (idCarreraAsignatura) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/operaciones/filtrarCarreraAsignaturaxId/${idCarreraAsignatura}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarCarreraAsignatura = async (modCarreraAsignatura) => {
    try {
        const body = {
            idCarrera: modCarreraAsignatura.idCarrera,
            idAsignatura: modCarreraAsignatura.asignatura
        };
        const response = await axios.post(`${enviroment.localhost}/operaciones/insertarCarreraAsignatura`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarCarreraAsignatura = async (modCarreraAsignatura) => {
    try {
        const body = {
            idCarreraAsignatura: modCarreraAsignatura.idCarreraAsignatura,
            idCarrera: modCarreraAsignatura.idCarrera,
            idAsignatura: modCarreraAsignatura.asignatura
        };
        const response = await axios.put(`${enviroment.localhost}/operaciones/actualizarCarreraAsignatura`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarCarreraAsignatura = async (idCarreraAsignatura) => {
    try {
        const data = {
            idCarreraAsignatura: idCarreraAsignatura,
        };
        const response = await axios.delete(`${enviroment.localhost}/operaciones/eliminarCarreraAsignatura`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};