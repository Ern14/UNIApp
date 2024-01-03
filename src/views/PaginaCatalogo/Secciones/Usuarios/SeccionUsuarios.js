import React, { useState } from 'react';
import DataGridUsuarios from '../../../../components/DataGrid/Usuarios/DataGridUsuarios';
import ModalUsuarios from '../../../../components/Modal/Usuarios/ModalUsuarios';

import './SeccionUsuarios.css'

const SeccionUsuarios = () => {

    const [ estadoModal, cambiarEstado ] = useState( false );

    return(
        <div className='userSec'>
            <div className='secContainer'>
                <div className='interact'>
                    <div className='addDiv'>
                        <button 
                            className='buttonDesing'
                            onClick={() => cambiarEstado( !estadoModal )}
                        >
                            Agregar</button>
                    </div>
                    <div className='searchDiv'>
                        <input className='inputBuscar'></input>   
                        <button className='buttonDesing'>Buscar</button>
                    </div>             
                </div>
                <div className='grid'>
                    <DataGridUsuarios />
                </div>
                
            </div>
            <ModalUsuarios
                estado={estadoModal}
                cambiarEstado={cambiarEstado}
            >

            </ModalUsuarios>
        </div>
    );
}

export default SeccionUsuarios;