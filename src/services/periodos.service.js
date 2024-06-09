import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerPeriodos = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/periodos/obtenerPeriodos`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerPeriodoxId = async (idPeriodo) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/periodos/filtrarPeriodoxId/${idPeriodo}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const filtrarPeriodosxBusqueda = async (busqueda) => {
    try {
        const body = {
            Busqueda: busqueda
        };
        const response = await axios.post(`${enviroment.localhost}/periodos/filtrarPeriodoxBusqueda`, body );
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarPeriodos = async (modPeriodo) => {
    try {
        const body = {
            Nombre: modPeriodo.nombre
        };
        const response = await axios.post(`${enviroment.localhost}/periodos/insertarPeriodo`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarPeriodos = async (modPeriodo) => {
    try {
        const body = {
            IdPeriodo: modPeriodo.idPeriodo,
            Nombre: modPeriodo.nombre,
        };
        const response = await axios.put(`${enviroment.localhost}/periodos/actualizarPeriodo`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarPeriodos = async (idPeriodo) => {
    try {
        const data = {
            IdPeriodo: idPeriodo,
        };
        const response = await axios.delete(`${enviroment.localhost}/periodos/eliminarPeriodo`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};