import { React, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../../shared/toastOptions';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import "./LoginCard.css";

const LoginCard = () => {

    const notifySuccess = (mensaje) => toast.success(mensaje, toastOptions);
    const notifyWarning = (mensaje) => toast.warn(mensaje, toastOptions);
    const notifyError = (error) => toast.error(error, toastOptions);

    const [body, setBody] = useState({
        Correo: null,
        Contraseña: null
    });

    const inputChange = ({ target }) => {
        const { name, value } = target;
        setBody({
            ...body,
            [name]: value
        })

    }

    const onSubmit = async () => {
        try {
            await axios.post('http://localhost:4000/validarUsuario', body)
                .then(({ response }) => {
                    notifySuccess(response.data.datos.mensaje)
                }).catch(({ response }) => {
                    if(response.data.statusCode === 404){
                        notifyWarning(response.data.datos)
                    }else{
                        notifyError(response.data.datos)
                    }
                })

        } catch (error) {
            notifyError(error);
        }

    }
    
    return (
        <div className='card'>
            <p>Iniciar Sesion</p>
            <form>
                <div className='textfield'>
                    <input
                        type="email"
                        required
                        value={body.correo}
                        onChange={inputChange}
                        name='Correo'
                    />
                    <span></span>
                    <label>Correo</label>
                </div>
                <div className='textfield'>
                    <input
                        type="password"
                        required
                        value={body.contraseña}
                        onChange={inputChange}
                        name='Contraseña'
                    />
                    <span></span>
                    <label>Contraseña</label>
                </div>
                <div className="submitbutton">
                    <input
                        type="submit"
                        value="Ingresar"
                        onClick={onSubmit}
                    />

                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default LoginCard;
