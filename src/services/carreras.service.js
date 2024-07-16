import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerCarreras = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/carreras/obtenerCarreras`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerCarreraxId = async (idCarrera) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/carreras/filtrarCarreraxId/${idCarrera}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const filtrarCarrerasxBusqueda = async (busqueda) => {
    try {
        const body = {
            Busqueda: busqueda
        };
        const response = await axios.post(`${enviroment.localhost}/carreras/filtrarCarreraxBusqueda`, body );
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarCarreras = async (modCarrera) => {
    try {
        const body = {
            IdDepartamento: modCarrera.idDepartamento,
            Nombre: modCarrera.nombre,
            Abreviatura: modCarrera.abreviatura,
            Descripcion: modCarrera.descripcion
        };
        const response = await axios.post(`${enviroment.localhost}/carreras/insertarCarrera`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarCarreras = async (modCarrera) => {
    try {
        const body = {
            IdCarrera: modCarrera.idCarrera,
            IdDepartamento: modCarrera.IdDepartamento,
            Nombre: modCarrera.nombre,
            Abreviatura: modCarrera.abreviatura,
            Descripcion: modCarrera.descripcion
        };
        const response = await axios.put(`${enviroment.localhost}/carreras/actualizarCarrera`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarCarreras = async (idCarrera) => {
    try {
        const data = {
            IdCarrera: idCarrera,
        };
        const response = await axios.delete(`${enviroment.localhost}/carreras/eliminarCarrera`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};