import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Card, Snackbar, Alert } from '@mui/material';
import { eliminarCarreraAsignatura, obtenerCarreraAsignatura } from '../../../../services/carrera-asignatura.service';
import { obtenerAsignaturas } from '../../../../services/asignaturas.service';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import FormularioCarreraAsignatura from '../../../../components/Dialog/Forms/CarreraAsignatura/FormularioCarreraAsignatura';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import { Columns } from './CarreraAsignaturaColumns';

import './SeccionCarreraAsignatura.css';

const SeccionCarreraAsignatura = (props) => {
    const { idCarrera } = props;

    const [data, setData] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [idCarreraAsignatura, setIdCarreraAsignatura] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const cargarDatos = async () => {
        const data = await obtenerCarreraAsignatura(idCarrera);
        setData(data);
    };

    const cargarAsignaturas = async () => {
        const result = await obtenerAsignaturas();
        setAsignaturas(result);
    };

    const eliminar = async () => {
        const data = await eliminarCarreraAsignatura(idCarreraAsignatura);
        handleSnackbarOpen(data);
        if (data.status === "Exito") {
            cargarDatos();
        }
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

    const handleForm = (idCarreraAsignatura) => {
        setIdCarreraAsignatura(idCarreraAsignatura);
        setEstado(true);
    };

    const handleConfirm = (idCarreraAsignatura) => {
        setIdCarreraAsignatura(idCarreraAsignatura);
        setEstadoConfirm(true);
    };

    useEffect(() => {
        cargarDatos();
        cargarAsignaturas();
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
    };

    return ( 
        <div className='grupo-container'>
            <AppBar
                sx={styles.appbar}
            >
                <Typography
                    sx={styles.typography}
                >Asociar carreras</Typography>
            </AppBar>
            <div className='info-container'>
            <Card sx={styles.card}>
                    <div className='carrera-asignatura-card-content'>
                        <div className='acciones-carrera-asignatura'>
                            <Button
                                sx={styles.button}
                                variant="contained"
                                onClick={() => handleForm(null)}
                            >
                                Agregar
                            </Button>
                        </div>
                        <div className='grid-carrera-asignatura'>
                            <DefaultDataGrid
                                handleForm={handleForm}
                                handleConfirm={handleConfirm}
                                data={data}
                                columns={Columns}
                                idField='idCarreraAsignatura'
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <FormularioCarreraAsignatura
                estado={estado}
                setEstado={setEstado}
                idCarreraAsignatura={idCarreraAsignatura}
                idCarrera={idCarrera}
                asignaturas={asignaturas}
                onConfirm={handleSnackbarOpen}
            />
            <Confirmation
                estado={estadoConfirm}
                setEstado={setEstadoConfirm}
                onConfirm={eliminar}
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
 
export default SeccionCarreraAsignatura;