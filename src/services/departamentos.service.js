import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerDepartamentos = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/departamentos/obtenerDepartamentos`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerDepartamentoxId = async (idDepartamento) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/departamentos/filtrarDepartamentoxId/${idDepartamento}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const filtrarDepartamentoxBusqueda = async (busqueda) => {
    try {
        const body = {
            Busqueda: busqueda
        };
        const response = await axios.post(`${enviroment.localhost}/departamentos/filtrarDepartamentoxBusqueda`, body );
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarDepartamentos = async (modDepartamento) => {
    try {
        const body = {
            Nombre: modDepartamento.nombre
        };
        const response = await axios.post(`${enviroment.localhost}/departamentos/insertarDepartamento`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarDepartamentos = async (modDepartamento) => {
    try {
        const body = {
            IdDepartamento: modDepartamento.idDepartamento,
            Nombre: modDepartamento.nombre,
        };
        const response = await axios.put(`${enviroment.localhost}/departamentos/actualizarDepartamento`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarDepartamentos = async (idDepartamento) => {
    try {
        const data = {
            IdDepartamento: idDepartamento,
        };
        const response = await axios.delete(`${enviroment.localhost}/departamentos/eliminarDepartamento`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};