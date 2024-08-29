import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerDocenteDepartamento = async (idDocente) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/operaciones/obtenerDocenteDepartamento/${idDocente}`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerDocenteDepartamentoxId = async (idDocenteDepartamento) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/operaciones/filtrarDocenteDepartamentoxId/${idDocenteDepartamento}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarDocenteDepartamento = async (modDocenteDepartamento) => {
    try {
        const body = {
            idDocente: modDocenteDepartamento.idDocente,
            idDepartamento: modDocenteDepartamento.departamento
        };
        const response = await axios.post(`${enviroment.localhost}/operaciones/insertarDocenteDepartamento`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarDocenteDepartamento = async (modDocenteDepartamento) => {
    try {
        const body = {
            idDocenteDepartamento: modDocenteDepartamento.idDocenteDepartamento,
            idDocente: modDocenteDepartamento.idDocente,
            idDepartamento: modDocenteDepartamento.departamento
        };
        const response = await axios.put(`${enviroment.localhost}/operaciones/actualizarDocenteDepartamento`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarDocenteDepartamento = async (idDocenteDepartamento) => {
    try {
        const data = {
            idDocenteDepartamento: idDocenteDepartamento,
        };
        const response = await axios.delete(`${enviroment.localhost}/operaciones/eliminarDocenteDepartamento`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};