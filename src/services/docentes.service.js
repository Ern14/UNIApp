import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerDocentes = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/docentes/obtenerDocentes`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerDocentexId = async (idDocente) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/docentes/filtrarDocentexId/${idDocente}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const filtrarDocentesxBusqueda = async (busqueda) => {
    try {
        const body = {
            Busqueda: busqueda
        };
        const response = await axios.post(`${enviroment.localhost}/docentes/filtrarDocentexBusqueda`, body );
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarDocentes = async (modDocente) => {
    try {
        const body = {
            Nombre: modDocente.nombre,
            Apellido: modDocente.apellido
        };
        const response = await axios.post(`${enviroment.localhost}/docentes/insertarDocente`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarDocentes = async (modDocente) => {
    try {
        const body = {
            IdDocente: modDocente.idDocente,
            Nombre: modDocente.nombre,
            Apellido: modDocente.apellido
        };
        const response = await axios.put(`${enviroment.localhost}/docentes/actualizarDocente`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarDocentes = async (idDocente) => {
    try {
        const data = {
            IdDocente: idDocente,
        };
        const response = await axios.delete(`${enviroment.localhost}/docentes/eliminarDocente`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};