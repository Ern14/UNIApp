import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerUsuarios = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/obtenerUsuarios`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const filtrarUsuariosxBusqueda = async (busqueda) => {
    try {
        const body = {
            Busqueda: busqueda
        };
        const response = await axios.post(`${enviroment.localhost}/filtrarUsuariosxBusqueda`, body );
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerUsuarioxId = async (idUsuario) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/filtrarUsuarios/${idUsuario}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarUsuario = async (modUsuario) => {
    try {
        const body = {
            Correo: modUsuario.correo,
            Contraseña: modUsuario.contrasena,
            FK_idRol: modUsuario.permiso
        };
        const response = await axios.post(`${enviroment.localhost}/insertarUsuarios`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarUsuario = async (modUsuario) => {
    try {
        const body = {
            IdUsuario: modUsuario.idUsuario,
            Correo: modUsuario.correo,
            FK_idRol: modUsuario.permiso
        };
        const response = await axios.put(`${enviroment.localhost}/actualizarUsuarios`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarUsuarios = async (idUsuario) => {
    try {
        const data = {
            IdUsuario: idUsuario,
        };
        const response = await axios.delete(`${enviroment.localhost}/eliminarUsuarios`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

