import { React, useState } from 'react';
import { login } from '../../services/inicio-sesion.service';

import "./LoginCard.css";

const LoginCard = ({ onSuccess, onWarning, onError }) => {


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

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const datos = await login(body);
            onSuccess(datos.mensaje);

        } catch (error) {
            if (!error.statusCode === 400){
                onError(error.datos);
            }else{
                onWarning(error.datos.mensaje)
            }
            
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
        </div>
    );
};

export default LoginCard;
