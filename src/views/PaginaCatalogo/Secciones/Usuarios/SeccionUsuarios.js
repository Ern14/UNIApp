import React from 'react';
import DataGridUsuarios from '../../../../components/DataGrid/Usuarios/DataGridUsuarios';

import './SeccionUsuarios.css'

const SeccionUsuarios = () => {
    return(
        <div className='userSec'>
            <div className='secContainer'>
                <div className='interact'>
                    <div className='addDiv'>
                        <button className='buttonDesing'>Agregar</button>
                    </div>
                    <div className='searchDiv'>
                        <input className='searchInput'></input>
                        <button className='buttonDesing'>Buscar</button>
                    </div>             
                </div>
                <div className='grid'>
                    <DataGridUsuarios />
                </div>
            </div>
        </div>
    );
}

export default SeccionUsuarios;