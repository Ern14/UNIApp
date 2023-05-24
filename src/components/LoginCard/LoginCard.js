import React from 'react';
import "./LoginCard.css";

const LoginCard = () => {
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
                    <input type="submit" value="Ingresar"></input>
                </div>
            </form>
        </div>
    );
};

export default LoginCard;
