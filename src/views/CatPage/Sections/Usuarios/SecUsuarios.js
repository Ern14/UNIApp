import React from 'react';
import UsersDatagrid from '../../../../components/DataGrid/Users/UserDataGrid';

import './SecUsuarios.css'

const SecUsuario = () => {
    return(
        <div className='userSec'>
            <div className='secContainer'>
                <div className='interact'>
                    <button className='addNewUser'>Agregar</button>
                </div>
                <div className='grid'>
                    <UsersDatagrid />
                </div>
            </div>
        </div>
    );
}

export default SecUsuario;