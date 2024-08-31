import React, { useState, useEffect } from 'react';
import { eliminarCarreras, obtenerCarreras, filtrarCarrerasxBusqueda } from '../../../../services/carreras.service';
import { obtenerDepartamentos } from '../../../../services/departamentos.service';
import { AppBar, Button, Typography, Card, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import Controls from '../../../../components/Controls/Controls'
import FormlarioCarrera from '../../../../components/Dialog/Forms/Carreras/FormularioCarrera';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import SeccionCarreraAsignatura from '../CarreraAsignatura/SeccionCarreraAsignatura';
import { Columns } from './CarrerasColumns';
import { Tooltip, IconButton } from '@mui/material';
import { Assignment } from '@mui/icons-material';

import './SeccionCarreras.css';

const SeccionCarreras = () => {
    const [data, setData] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [idCarrera, setIdCarrera] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [showSeccionCarreraAsignatura, setShowSeccionCarreraAsignatura] = useState(false);

    const cargarDatos = async () => {
        const data = await obtenerCarreras();
        setData(data);
    };

    const cargarDepartamentos = async () => {
        const result = await obtenerDepartamentos();
        setDepartamentos(result);
    };

    const eliminarCarrera = async () => {
        const data = await eliminarCarreras(idCarrera);
        handleSnackbarOpen(data);
        if (data.status === "Exito") {
            cargarDatos();
        }
    };

    const handleAsociar = (id) => {
        setIdCarrera(id);
        setShowSeccionCarreraAsignatura(true);
    };

    const handleVolver = () => {
        setShowSeccionCarreraAsignatura(false);
        setIdCarrera(null);
    };

    const handleChange = async (e) => {
        const result = await filtrarCarrerasxBusqueda(e.target.value);
        setData(result);
    };

    const handleForm = (idCarrera) => {
        setIdCarrera(idCarrera);
        setEstado(true);
    };

    const handleConfirm = (idCarrera) => {
        setIdCarrera(idCarrera);
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
        cargarDepartamentos();
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
        <div className='carrera-container'>
            {showSeccionCarreraAsignatura ? (
                <SeccionCarreraAsignatura idCarrera={idCarrera} />
            ) : (
                <>
                    <AppBar
                        sx={styles.appbar}
                    >
                        <Typography
                            sx={styles.typography}
                        >Catálogo carreras</Typography>
                    </AppBar>
                    <div className='info-container'>
                        <Card sx={styles.card}>
                            <div className='acciones-carrera'>
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
                            <div className='grid-carrera'>
                                <DefaultDataGrid
                                    handleForm={handleForm}
                                    handleConfirm={handleConfirm}
                                    data={data}
                                    columns={Columns}
                                    idField='idCarrera'
                                    additionalActions={[({ params }) => (
                                        <Tooltip title="Asociar">
                                            <IconButton variant="contained" color="default" onClick={() => handleAsociar(params.row.idCarrera)}>
                                                <Assignment />
                                            </IconButton>
                                        </Tooltip>
                                    )]}
                                />
                            </div>
                        </Card>
                    </div>
                    <FormlarioCarrera
                        estado={estado}
                        setEstado={setEstado}
                        idCarrera={idCarrera}
                        departamentos={departamentos}
                        onConfirm={handleSnackbarOpen}
                    />
                    <Confirmation
                        estado={estadoConfirm}
                        setEstado={setEstadoConfirm}
                        onConfirm={eliminarCarrera}
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
                </>
            )}
            {showSeccionCarreraAsignatura && (
                <Button onClick={handleVolver}>Volver</Button>
            )}
        </div>
    );
}

export default SeccionCarreras;