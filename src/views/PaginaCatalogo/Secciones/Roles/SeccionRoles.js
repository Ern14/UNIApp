import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Card, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { obtenerRoles, filtrarRolesxBusqueda, eliminarRoles } from '../../../../services/roles.service';
import DataGridRoles from '../../../../components/DataGrid/Roles/DataGridRoles';
import FormularioRoles from '../../../../components/Dialog/Forms/Roles/FormularioRoles';
import Controls from '../../../../components/Controls/Controls';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';

import './SeccionRoles.css';

const SeccionRoles = () => {
    const [data, setData] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [idRol, setIdRol] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const cargarDatos = async () => {
        const data = await obtenerRoles();
        setData(data);
    };

    const eliminarRol = async () => {
        const data = await eliminarRoles(idRol);
        handleSnackbarOpen(data);
        if (data.status === "Exito") {
            cargarDatos();
        }
    };

    const handleChange = async (e) => {
        const result = await filtrarRolesxBusqueda(e.target.value);
        setData(result);
    };

    const handleSnackbarOpen = (result) => {
        if (result.statusCode === 200){
            cargarDatos();
            setSnackbar({ open: true, message: result.datos.mensaje, severity: "success" });
        }else{
            setSnackbar({ open: true, message: result.datos.mensaje, severity: "warning" });
        }
    
    };

    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "success" });
    };

    const handleForm = (idRol) => {
        setIdRol(idRol);
        setEstado(true);
    };

    const handleConfirm = (idRol) => {
        setIdRol(idRol);
        setEstadoConfirm(true);
    };

    useEffect(() => {
        cargarDatos();
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
                >Catálogo roles</Typography>
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
                        <DataGridRoles
                            handleForm={handleForm}
                            handleConfirm={handleConfirm}
                            data={data}
                        />
                    </div>
                </Card>
            </div>
            <FormularioRoles
                estado={estado}
                setEstado={setEstado}
                idRol={idRol}
                onConfirm={handleSnackbarOpen}
            />
            <Confirmation
                estado={estadoConfirm}
                setEstado={setEstadoConfirm}
                onConfirm={eliminarRol}
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

export default SeccionRoles;