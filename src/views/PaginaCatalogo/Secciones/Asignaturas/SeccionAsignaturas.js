import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Card, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { obtenerAsignaturas, eliminarAsignaturas, filtrarAsignaturasxBusqueda } from '../../../../services/asignaturas.service';
import { obtenerPeridos } from '../../../../services/periodos.service';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import FormularioAsignatura from '../../../../components/Dialog/Forms/Asignaturas/FormularioAsignatura';
import Controls from '../../../../components/Controls/Controls';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import { Columns } from './AsignaturasColumns';

import './SeccionAsignaturas.css';

const SeccionAsignaturas = () => {
    const [data, setData] = useState([]);
    const [peridos, setPeriodos] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [idAsignatura, setIdAsignatura] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const cargarDatos = async () => {
        const data = await obtenerAsignaturas();
        setData(data);
    };

    const cargarPeriodos = async () => {
        const result = await obtenerPeridos();
        setPeriodos(result);
    };

    const eliminarAsignatura = async () => {
        const data = await eliminarAsignaturas(idAsignatura);
        handleSnackbarOpen(data);
        if (data.status === "Exito") {
            cargarDatos();
        }
    };

    const handleForm = (idAsignatura) => {
        setIdAsignatura(idAsignatura);
        setEstado(true);
    };

    const handleChange = async (e) => {
        const result = await filtrarAsignaturasxBusqueda(e.target.value);
        setData(result);
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

    const handleConfirm = (idAsignatura) => {
        setIdAsignatura(idAsignatura);
        setEstadoConfirm(true);
    };

    useEffect(() => {
        cargarDatos();
        cargarPeriodos();
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
        <div className='asignaturas-container'>
            <AppBar
                sx={styles.appbar}
            >
                <Typography
                    sx={styles.typography}
                >Catálogo asignaturas</Typography>
            </AppBar>
            <div className='info-container'>
                <Card sx={styles.card}>
                    <div className='acciones-asignaturas'>
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
                    <div className='grid-asignaturas'>
                        <DefaultDataGrid
                            handleForm={handleForm}
                            handleConfirm={handleConfirm}
                            data={data}
                            columns={Columns}
                            idField='idAsignatura'
                        />
                    </div>
                </Card>
            </div>
            <FormularioAsignatura
                estado={estado}
                setEstado={setEstado}
                idAsignatura={idAsignatura}
                periodos={peridos}
                onConfirm={handleSnackbarOpen}
            />
            <Confirmation
                estado={estadoConfirm}
                setEstado={setEstadoConfirm}
                onConfirm={eliminarAsignatura}
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

export default SeccionAsignaturas;