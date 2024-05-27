import { React, useState, useEffect } from 'react';
import { login } from '../../services/inicio-sesion.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { TextField, Button } from '@mui/material';

import "./LoginCard.css";


const LoginCard = ({ isAuthenticated, onConfirm }) => {
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
            const result = await login(body);
            if (result.statusCode === 200) {
                signin(result);
            }
            onConfirm(result);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/inicio')
        };
    }, [isAuthenticated, navigate]);

    return (
        <div className='card'>
            <p>Iniciar sesión</p>
            <form>
                <div className="container">
                    <div className="column">
                        <div className="row">
                            <TextField
                                className='input'
                                name='Correo'
                                label="Correo"
                                variant="standard"
                                value={body.correo}
                                onChange={inputChange}
                            />
                        </div>
                        <div className="row">
                            <TextField
                                className='input'
                                type="password"
                                name='Contraseña'
                                label="Contraseña"
                                variant="standard"
                                value={body.contraseña}
                                onChange={inputChange}
                            />
                        </div>

                    </div>
                </div>
                <div className="buttonContainer">
                    <Button
                        className='botonSubmit'
                        variant="contained"
                        onClick={onSubmit}>
                        Ingresar
                    </Button>
                </div>
            </form>
            <div className="registroContainer">
                <label className='registro'>
                    O cree un nuevo usuario
                </label>
                <Button
                    color="secondary">
                    Registrarse
                </Button>
            </div>
        </div>
    );
};

export default LoginCard;
