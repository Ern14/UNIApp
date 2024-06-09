import React, { useState, useEffect } from 'react';
import { eliminarUsuarios, obtenerUsuarios, filtrarUsuariosxBusqueda } from '../../../../services/usuarios.service';
import { obtenerRoles } from '../../../../services/roles.service';
import { AppBar, Button, Typography, Card, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import Controls from '../../../../components/Controls/Controls'
import FormularioUsuario from '../../../../components/Dialog/Forms/FormularioUsuario';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import { Columns } from './UsuariosColumns';

import './SeccionUsuarios.css';

const SeccionUsuarios = () => {
    const [data, setData] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [roles, setRoles] = useState([]);
    const [idUsuario, setIdUsuario] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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
        handleSnackbarOpen(data);
        if (data.status === "Exito") {
            cargarDatos();
        }
    };

    const handleChange = async (e) => {
        const result = await filtrarUsuariosxBusqueda(e.target.value);
        setData(result);
    };

    const handleForm = (idUsuario) => {
        setIdUsuario(idUsuario);
        setEstado(true);
    };

    const handleConfirm = (idUsuario) => {
        setIdUsuario(idUsuario);
        setEstadoConfirm(true);
    };

    const handleSnackbarOpen = (result) => {
        if (result.statusCode === 200) {
            cargarDatos();
            setSnackbar({ open: true, message: result.datos.mensaje, severity: "success" });
        } else {
            setSnackbar({ open: true, message: result.datos.mensaje, severity: "warning" });
        }

    };

    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "success" });
    };

    useEffect(() => {
        cargarDatos();
        cargarRoles();
    }, []);

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
                    <div className='acciones-usuarios'>
                        <Button
                            sx={styles.button}
                            variant="contained"
                            onClick={() => handleForm(null)}
                        >
                            Agregar
                        </Button>
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
                    </div>
                    <div className='grid-usuarios'>
                        <DefaultDataGrid
                            handleForm={handleForm}
                            handleConfirm={handleConfirm}
                            data={data}
                            columns={Columns}
                            idField='idUsuario'
                        />
                    </div>
                </Card>
            </div>
            <FormularioUsuario
                estado={estado}
                setEstado={setEstado}
                idUsuario={idUsuario}
                roles={roles}
                onConfirm={handleSnackbarOpen}
            />
            <Confirmation
                estado={estadoConfirm}
                setEstado={setEstadoConfirm}
                onConfirm={eliminarUsuario}
            />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    severity={snackbar.severity}
                    variant='filled'
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SeccionUsuarios;