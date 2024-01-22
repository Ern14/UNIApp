import React, { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ModalUsuarios.css'

const ModalUsuarios = ({ estado, cambiarEstado }) => {

    const notifySuccess = () => toast.success("Usuario Creado!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWarning = () => toast.warn("Usuario existente", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyError = () => toast.error("Error", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }
    );

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [selects, setSelects] = useState();

    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        const zonaHoraria = { timeZone: 'America/Managua' };
        return fechaActual.toLocaleString('es-NI', zonaHoraria);
    };

    const InsertarUsuario = async () => {
        const existeUsuario = await axios.get(`http://localhost:4000/filtrarUsuarios/${correo}`);
        if (existeUsuario.data.datos.length > 0) {
            notifyWarning();
        }else{
            axios.post('http://localhost:4000/insertarUsuarios', {
            FK_idRol: 2,
            Correo: correo,
            Contraseña: contrasena,
            Activo: 1,
            FechaCreacion: "2023-11-19 00:00:00.000",
            UsuarioCreacion: 1,
            FechaModificacion: "2023-11-19 00:00:00.000",
            UsuarioModificacion: 1
        })
            .then(function (response) {
                notifySuccess();
            })
            .catch(function (error) {
                notifyError(error);
            });
        }

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
                                <select value={selects} onChange={e => setSelects(e.target.value)}>
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
                        <ToastContainer
                            position="bottom-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </div>
            }
        </>
    );
}

export default ModalUsuarios;