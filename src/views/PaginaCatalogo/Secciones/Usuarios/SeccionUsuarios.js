import React, { useState } from 'react';
import { AppBar, Typography } from '@mui/material';
import DataGridUsuarios from '../../../../components/DataGrid/Usuarios/DataGridUsuarios';
import ModalUsuarios from '../../../../components/Modal/Usuarios/ModalUsuarios';

import './SeccionUsuarios.css'

const SeccionUsuarios = () => {

    const [ estadoModal, cambiarEstado ] = useState( false );

    return(
        <div className='usuario-container'>
            <AppBar 
                sx={{
                    position: 'absolute',
                    backgroundColor: 'darkblue',
                    height: '60px',
                    alignItems: 'start',
                    justifyContent: 'center',
                    }}
                >
                <Typography
                    sx={{
                        fontSize: '20px',
                        paddingLeft: '25px',
                        fontWeight: 'bold'
                    }}
                >Catálogo usuarios</Typography>
            </AppBar>
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