import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../../../shared/toastOptions';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './ModalUsuarios.css';

const ModalUsuarios = ({ estado, cambiarEstado }) => {

    const notifySuccess = (msg) => toast.success(msg, toastOptions);
    const notifyWarning = (correo) => toast.warn("¡El correo: " + correo + " ya está registrado!", toastOptions);
    const notifyError = (error) => toast.error(error, toastOptions);

    const [data, setData] = useState([]);
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/roles/obtenerRoles')
            .then(response => {
                setData(response.data.datos);
            })
            .catch(error => {
                notifyError(error);
            });
    }, []);

    const InsertarUsuario = async () => {
        try {
            const existeUsuario = await axios.get(`http://localhost:4000/filtrarUsuarios/${correo}`);
            if (existeUsuario.data.datos.length > 0) {
                notifyWarning(existeUsuario.data.datos[0].Correo);
            } else {
                axios.post('http://localhost:4000/insertarUsuarios', {
                    FK_idRol: rol,
                    Correo: correo,
                    Contraseña: contrasena,
                    Activo: 1,
                    FechaCreacion: "2023-11-19 00:00:00.000",
                    UsuarioCreacion: 1,
                    FechaModificacion: "2023-11-19 00:00:00.000",
                    UsuarioModificacion: 1
                })
                    .then(function () {
                        const msg = "Usuario creado con exito";
                        notifySuccess(msg);
                    })
                    .catch(function (error) {
                        notifyError(error);
                    });
            }
        } catch (error) {
            notifyError(error);
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
                                <select id="rolesSelect" onChange={(e) => setRol(e.target.value)}>
                                    {data.map(rol => (
                                        <option key={rol.idRol} value={rol.idRol}>
                                            {rol.Nombre}
                                        </option>
                                    ))}
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
                        <ToastContainer/>
                    </div>
                </div>
            }
        </>
    );
}

export default ModalUsuarios;