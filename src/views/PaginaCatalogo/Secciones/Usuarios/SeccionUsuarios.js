import React, { useState } from 'react';
import { AppBar, Button, Typography, Card, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material'
import DataGridUsuarios from '../../../../components/DataGrid/Usuarios/DataGridUsuarios';
import Controls from '../../../../components/Controls/Controls'
import ModalUsuarios from '../../../../components/Modal/Usuarios/ModalUsuarios';

import './SeccionUsuarios.css'

const SeccionUsuarios = () => {

    const [estadoModal, cambiarEstado] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.value)
    }

    return (
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
            <div className='info-container'>
                <Card sx={{
                    height: '80vh',
                    width: '90%'
                }}>
                    <div className='acciones'>
                        <Controls.SearchInput
                            label="Buscar"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button 
                            sx={{
                                backgroundColor: 'darkblue'
                            }}
                            variant="contained">
                                Agregar
                            </Button>
                    </div>
                    <div className='grid'>
                        <DataGridUsuarios />
                    </div>

                </Card>
            </div>
        </div>
    );
}

export default SeccionUsuarios;