import React from 'react';
import './Navbar.css'

const Navbar = () => {
    return(
        <header className='navbar'>
            <div className='navbuttons'>
                <ul className='nav-links'>
                    <li><a href='#'>Inicio</a></li>
                    <li><a href='#'>Bitácora</a></li>
                    <li><a href='#'>Informe</a></li>
                    <li><a href='#'>Gestión de Usuarios</a></li>
                </ul>
            </div>
        </header>
    );
}

export default Navbar;