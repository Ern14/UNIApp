import React, { useState, useEffect } from 'react';
import { eliminarUsuarios, obtenerUsuarios } from '../../../../services/usuarios.service';
import { obtenerRoles } from '../../../../services/roles.service';
import { AppBar, Button, Typography, Card, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material'
import DataGridUsuarios from '../../../../components/DataGrid/Usuarios/DataGridUsuarios';
import Controls from '../../../../components/Controls/Controls'
import FormularioUsuario from '../../../../components/Dialog/Forms/FormularioUsuario';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';

import './SeccionUsuarios.css'

const SeccionUsuarios = () => {
    const [data, setData] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [roles, setRoles] = useState([]);
    const [idUsuario, setIdUsuario] = useState(null);
    
    const cargarDatos = async () => {
        const data = await obtenerUsuarios();
        setData(data);
    };

    const cargarRoles = async () => {
        const result = await obtenerRoles();
        setRoles(result);
    };

    const eliminarUsuario = async () => {
        const data = await eliminarUsuarios(idUsuario);
        if(data.status === "Exito"){
          cargarDatos();
        }
    };

    const handleChange = (e) => {
        console.log(e.target.value)
    };

    const handleForm = (idUsuario) => {
        setIdUsuario(idUsuario);
        setEstado(true);
    };

    const handleConfirm = (idUsuario) => {
        setIdUsuario(idUsuario);
        setEstadoConfirm(true);
    };

    useEffect(() => {
        cargarDatos();
        cargarRoles();
    },[]);

    const styles = {
        appbar: {
            position: 'absolute',
            backgroundColor: 'darkblue',
            height: '60px',
            alignItems: 'start',
            justifyContent: 'center',
        },
        typography: {
            fontSize: '20px',
            paddingLeft: '25px',
            fontWeight: 'bold'
        },
        card: {
            height: '80vh',
            width: '90%'
        },
        button: {
            backgroundColor: 'darkblue'
        }
    }

    return (
        <div className='usuario-container'>
            <AppBar
                sx={styles.appbar}
            >
                <Typography
                    sx={styles.typography}
                >Catálogo usuarios</Typography>
            </AppBar>
            <div className='info-container'>
                <Card sx={styles.card}>
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
                            sx={styles.button}
                            variant="contained"
                            onClick={() => handleForm(null)}
                            >
                                Agregar
                        </Button>
                    </div>
                    <div className='grid'>
                        <DataGridUsuarios 
                            handleForm={handleForm}
                            handleConfirm={handleConfirm}
                            data={data}
                        />
                    </div>
                </Card>
            </div>
            <FormularioUsuario
                estado={estado}
                setEstado={setEstado}
                idUsuario={idUsuario}
                roles={roles}
            />
            <Confirmation
                estado={estadoConfirm}
                setEstado={setEstadoConfirm}
                onConfirm={eliminarUsuario}
            />
        </div>
    );
}

export default SeccionUsuarios;