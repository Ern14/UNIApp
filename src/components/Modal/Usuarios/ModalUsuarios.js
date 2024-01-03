import React, { useState } from 'react';
import axios from 'axios';

import './ModalUsuarios.css'

const ModalUsuarios = ({ estado, cambiarEstado }) => {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [selects, setSelects] = useState();

    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        const zonaHoraria = { timeZone: 'America/Managua' };
        return fechaActual.toLocaleString('es-NI', zonaHoraria);
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
                        <form className='cuerpo'>
                            <div className='textfield'>  
                                <input
                                    type="email"
                                    required
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                ></input>
                                <span></span>
                                <label>Correo: </label>
                            </div>
                            <div className='textfield'>
                                <input
                                    required
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                ></input>
                                <span></span>
                                <label>Contraseña: </label>
                            </div>
                            <div className='textfield'>
                                <select value={selects} onChange={e=>setSelects(e.target.value)}>
                                    <option>Administrador</option>
                                    <option>Vice rector</option>
                                    <option>Jefe de departamento</option>
                                </select>
                                <span></span>
                                <label>Rol: </label>
                            </div>
                        </form>
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