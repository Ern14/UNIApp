import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Card, Snackbar, Alert } from '@mui/material';
import { eliminarDocenteAsignatura, obtenerDocenteAsignatura } from '../../../../services/docente-asignatura.service';
import { obtenerDocentes } from '../../../../services/docentes.service';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import FormularioDocenteAsignatura from '../../../../components/Dialog/Forms/DocenteAsignatura/FormularioDocenteAsignatura';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import { Columns } from './DocenteAsignaturaColumns';

import './SeccionDocenteAsignatura.css';

const SeccionDocenteAsignatura = (props) => {
    const { idAsignatura } = props;

    const [data, setData] = useState([]);
    const [docentes, setDocentes] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [idDocenteAsignatura, setIdDocenteAsignatura] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const cargarDatos = async () => {
        const data = await obtenerDocenteAsignatura(idAsignatura);
        setData(data);
    };

    const cargarAsignaturas = async () => {
        const result = await obtenerDocentes();
        setDocentes(result);
    };

    const eliminar = async () => {
        const data = await eliminarDocenteAsignatura(idDocenteAsignatura);
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

    const handleForm = (idDocenteAsignatura) => {
        setIdDocenteAsignatura(idDocenteAsignatura);
        setEstado(true);
    };

    const handleConfirm = (idDocenteAsignatura) => {
        setIdDocenteAsignatura(idDocenteAsignatura);
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
                >Asociar asignaturas</Typography>
            </AppBar>
            <div className='info-container'>
            <Card sx={styles.card}>
                    <div className='docente-asignatura-card-content'>
                        <div className='acciones-docente-asignatura'>
                            <Button
                                sx={styles.button}
                                variant="contained"
                                onClick={() => handleForm(null)}
                            >
                                Agregar
                            </Button>
                        </div>
                        <div className='grid-docente-asignatura'>
                            <DefaultDataGrid
                                handleForm={handleForm}
                                handleConfirm={handleConfirm}
                                data={data}
                                columns={Columns}
                                idField='idDocenteAsignatura'
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <FormularioDocenteAsignatura
                estado={estado}
                setEstado={setEstado}
                idDocenteAsignatura={idDocenteAsignatura}
                idAsignatura={idAsignatura}
                docentes={docentes}
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
 
export default SeccionDocenteAsignatura;