import React from 'react';
import UsersDatagrid from '../../../../components/DataGrid/Users/UserDataGrid';

import './SecUsuarios.css'

const SecUsuario = () => {
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
                    <UsersDatagrid />
                </div>
            </div>
        </div>
    );
}

export default SecUsuario;