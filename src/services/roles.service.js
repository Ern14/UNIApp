import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerRoles = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/roles/obtenerRoles`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerRolxId = async (idRol) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/roles/filtrarRol/${idRol}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const filtrarRolesxBusqueda = async (busqueda) => {
    try {
        const body = {
            Busqueda: busqueda
        };
        const response = await axios.post(`${enviroment.localhost}/filtrarRolesxBusqueda`, body );
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarRoles = async (modRol) => {
    try {
        const body = {
            Nombre: modRol.nombre,
            Descripcion: modRol.descripcion
        };
        const response = await axios.post(`${enviroment.localhost}/roles/insertarRoles`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarRoles = async (modRol) => {
    try {
        const body = {
            IdRol: modRol.idRol,
            Nombre: modRol.nombre,
            Descripcion: modRol.descripcion
        };
        const response = await axios.put(`${enviroment.localhost}/roles/actualizarRoles`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarRoles = async (idRol) => {
    try {
        const data = {
            IdRol: idRol,
        };
        const response = await axios.delete(`${enviroment.localhost}/roles/eliminarRoles`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};