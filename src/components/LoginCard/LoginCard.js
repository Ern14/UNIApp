import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginCard.css";

const LoginCard = () => {

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    }

    return(
        <div className='card'>
            <p>Iniciar Sesion</p>
            <form>
                <div className='textfield'>
                    <input type="email" required></input>
                    <span></span>
                    <label>Correo</label>
                </div>
                <div className='textfield'>
                    <input type="password" required></input>
                    <span></span>
                    <label>Contraseña</label>
                </div>
                <div className="submitbutton">
                    <input 
                        type="submit" 
                        value="Ingresar"
                        onClick={navigateHome}></input>
                </div>
            </form>
        </div>
    );
};

export default LoginCard;
