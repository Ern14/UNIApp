import { React, useState, useEffect } from 'react';
import { login } from '../../services/inicio-sesion.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

import "./LoginCard.css";


const LoginCard = ({ onSuccess, onWarning, onError, isAuthenticated }) => {
    const { signin } = useAuth();
    const navigate = useNavigate();
    
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
            signin(datos);
            onSuccess(datos.mensaje);
        } catch (error) {
            if (!error.statusCode === 400){
                onError(error.datos);
            }else{
                onWarning(error.datos.mensaje)
            }
            
        }

    }

    useEffect(() =>{
        if(isAuthenticated) navigate('/');
      },[isAuthenticated]);
    
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
