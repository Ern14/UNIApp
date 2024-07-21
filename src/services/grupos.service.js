import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerGrupos = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/grupos/obtenerGrupos`);
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const obtenerGrupoxId = async (idGrupo) => {
    try {
        const response = await axios.get(`${enviroment.localhost}/grupos/filtrarGrupoxId/${idGrupo}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const filtrarGruposxBusqueda = async (busqueda) => {
    try {
        const body = {
            Busqueda: busqueda
        };
        const response = await axios.post(`${enviroment.localhost}/grupos/filtrarGruposxBusqueda`, body );
        return response.data.datos;
    } catch (error) {
        return error.response.data;
    }

};

export const insertarGrupos = async (modGrupo) => {
    try {
        const body = {
            idPeriodo: modGrupo.periodo,
            idCarrera: modGrupo.carrera,
            Nombre: modGrupo.nombre
        };
        const response = await axios.post(`${enviroment.localhost}/grupos/insertarGrupo`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const actualizarGrupos = async (modGrupo) => {
    try {
        const body = {
            IdGrupo: modGrupo.idGrupo,
            IdPeriodo: modGrupo.periodo,
            IdCarrera: modGrupo.carrera,
            Nombre: modGrupo.nombre,
        };
        const response = await axios.put(`${enviroment.localhost}/grupos/actualizarGrupo`, body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};

export const eliminarGrupos = async (idGrupo) => {
    try {
        const data = {
            IdGrupo: idGrupo,
        };
        const response = await axios.delete(`${enviroment.localhost}/grupos/eliminarGrupo`, { data });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

};