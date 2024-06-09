import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Card, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { eliminarPeriodos, filtrarPeriodosxBusqueda, obtenerPeriodos } from '../../../../services/periodos.service';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import FormularioPeriodo from '../../../../components/Dialog/Forms/Periodos/FormularioPeriodo';
import Controls from '../../../../components/Controls/Controls';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import { Columns } from './PeriodosColumns';

import './SeccionPeriodos.css';

const SeccionPeriodos = () => {
    const [data, setData] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [idPeriodo, setIdPeriodo] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const cargarDatos = async () => {
        const data = await obtenerPeriodos();
        setData(data);
    };

    const eliminarRol = async () => {
        const data = await eliminarPeriodos(idPeriodo);
        handleSnackbarOpen(data);
        if (data.status === "Exito") {
            cargarDatos();
        }
    };

    const handleChange = async (e) => {
        const result = await filtrarPeriodosxBusqueda(e.target.value);
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

    const handleForm = (idPeriodo) => {
        setIdPeriodo(idPeriodo);
        setEstado(true);
    };

    const handleConfirm = (idPeriodo) => {
        setIdPeriodo(idPeriodo);
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
    };

    return ( 
        <div className='periodos-container'>
            <AppBar
                sx={styles.appbar}
            >
                <Typography
                    sx={styles.typography}
                >Catálogo periodos</Typography>
            </AppBar>
            <div className='info-container'>
            <Card sx={styles.card}>
                    <div className='periodos-card-content'>
                        <div className='acciones-periodos'>
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
                        <div className='grid-periodos'>
                            <DefaultDataGrid
                                handleForm={handleForm}
                                handleConfirm={handleConfirm}
                                data={data}
                                columns={Columns}
                                idField='idPeriodo'
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <FormularioPeriodo
                estado={estado}
                setEstado={setEstado}
                idPeriodo={idPeriodo}
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
 
export default SeccionPeriodos;