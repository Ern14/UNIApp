import React, { useState } from 'react';
import axios from 'axios';

import './ModalUsuarios.css'

const ModalUsuarios = ({ estado, cambiarEstado }) => {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        return fechaActual.toISOString();
    };

    const InsertarUsuario = async () => {
        const fechaCreacion = obtenerFechaActual();
        const fechaModificacion = obtenerFechaActual();

        axios.post('http://localhost:4000/insertarUsuarios', {
            FK_idRol: 1,
            Correo: correo,
            Contraseña: contrasena,
            Activo: 1,
            FechaCreacion: fechaCreacion,
            UsuarioCreacion: 1,
            FechaModificacion: fechaModificacion,
            UsuarioModificacion: 1
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            {estado &&
                <div className='Overlay'>
                    <div className='contenedor'>
                        <div className='encabezado'>
                            <h3 className='tituloModal'>Nuevo usuario</h3>
                            <button
                                className='botonCerrarEncabezado'
                                onClick={() => cambiarEstado(false)}
                            >
                                X</button>
                        </div>
                        <div className='cuerpo'>
                            <label className='nombreLabel'>Correo: </label>
                            <input 
                                className='campo'
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            ></input>
                            <label className='nombreLabel'>Contraseña: </label>
                            <input 
                                className='campo'
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            ></input>
                        </div>
                        <div className='divBotones'>
                            <button
                                className='boton'
                                onClick={InsertarUsuario}
                            >
                                Aceptar</button>
                            <button
                                className='boton'
                                onClick={() => cambiarEstado(false)}
                            >
                                Cerrar</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ModalUsuarios;