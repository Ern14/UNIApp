import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Card, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { eliminarDepartamentos, filtrarDepartamentoxBusqueda, obtenerDepartamentos } from '../../../../services/departamentos.service';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import FormularioDepartamento from '../../../../components/Dialog/Forms/Departamentos/FormularioDepartamento';
import Controls from '../../../../components/Controls/Controls';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import { Columns } from './DepartamentosColumns';

import './SeccionDepartamentos.css';


const SeccionDepartamentos = () => {
    const [data, setData] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [idDepartamento, setIdDepartamento] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const cargarDatos = async () => {
        const data = await obtenerDepartamentos();
        setData(data);
    };

    const eliminarDepartamento = async () => {
        const data = await eliminarDepartamentos(idDepartamento);
        handleSnackbarOpen(data);
        if (data.status === "Exito") {
            cargarDatos();
        }
    };

    const handleChange = async (e) => {
        const result = await filtrarDepartamentoxBusqueda(e.target.value);
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

    const handleForm = (idDepartamento) => {
        setIdDepartamento(idDepartamento);
        setEstado(true);
    };

    const handleConfirm = (idDepartamento) => {
        setIdDepartamento(idDepartamento);
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
        <div className='departamentos-container'>
            <AppBar
                sx={styles.appbar}
            >
                <Typography
                    sx={styles.typography}
                >Catálogo área de conocimiento</Typography>
            </AppBar>
            <div className='info-container'>
            <Card sx={styles.card}>
                    <div className='departamentos-card-content'>
                        <div className='acciones-departamentos'>
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
                        <div className='grid-departamentos'>
                            <DefaultDataGrid
                                handleForm={handleForm}
                                handleConfirm={handleConfirm}
                                data={data}
                                columns={Columns}
                                idField='idDepartamento'
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <FormularioDepartamento
                estado={estado}
                setEstado={setEstado}
                idDepartamento={idDepartamento}
                onConfirm={handleSnackbarOpen}
            />
            <Confirmation
                estado={estadoConfirm}
                setEstado={setEstadoConfirm}
                onConfirm={eliminarDepartamento}
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
 
export default SeccionDepartamentos;