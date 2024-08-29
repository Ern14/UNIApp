import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Card, Snackbar, Alert } from '@mui/material';
import { eliminarDocenteDepartamento, obtenerDocenteDepartamento } from '../../../../services/docente-departamento.service';
import { obtenerDepartamentos } from '../../../../services/departamentos.service';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import FormularioDocenteDepartamento from '../../../../components/Dialog/Forms/DocenteDepartamento/FormularioDocenteDepartamento';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import { Columns } from './DocenteDepartamentoColumns';

import './SeccionDocenteDepartamento.css';

const SeccionDocenteDepartamento = (props) => {
    const { idDocente } = props;

    const [data, setData] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [idDocenteDepartamento, setIdDocenteDepartamento] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const cargarDatos = async () => {
        const data = await obtenerDocenteDepartamento(idDocente);
        setData(data);
    };

    const cargarDepartamentos = async () => {
        const result = await obtenerDepartamentos();
        setDepartamentos(result);
    };

    const eliminar = async () => {
        const data = await eliminarDocenteDepartamento(idDocenteDepartamento);
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

    const handleForm = (idDocenteDepartamento) => {
        setIdDocenteDepartamento(idDocenteDepartamento);
        setEstado(true);
    };

    const handleConfirm = (idDocenteDepartamento) => {
        setIdDocenteDepartamento(idDocenteDepartamento);
        setEstadoConfirm(true);
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
    };

    return ( 
        <div className='grupo-container'>
            <AppBar
                sx={styles.appbar}
            >
                <Typography
                    sx={styles.typography}
                >Asociar área de conocimiento</Typography>
            </AppBar>
            <div className='info-container'>
            <Card sx={styles.card}>
                    <div className='docente-departamento-card-content'>
                        <div className='acciones-docente-departamento'>
                            <Button
                                sx={styles.button}
                                variant="contained"
                                onClick={() => handleForm(null)}
                            >
                                Agregar
                            </Button>
                        </div>
                        <div className='grid-docente-departamento'>
                            <DefaultDataGrid
                                handleForm={handleForm}
                                handleConfirm={handleConfirm}
                                data={data}
                                columns={Columns}
                                idField='idDocenteDepartamento'
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <FormularioDocenteDepartamento
                estado={estado}
                setEstado={setEstado}
                idDocenteDepartamento={idDocenteDepartamento}
                idDocente={idDocente}
                departamentos={departamentos}
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
 
export default SeccionDocenteDepartamento;