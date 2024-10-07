import axios from '../axios';
import { enviroment } from '../environment/enviroment';

export const obtenerManualUsuario = async () => {
    try {
        const response = await axios.get(`${enviroment.localhost}/archivos/obtenerManualUsuario`, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ManualUsuario.pdf');
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
    } catch (error) {
        console.error('Error al obtener el manual de usuario:', error);
    }

};