import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Card, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { eliminarDocentes, filtrarDocentesxBusqueda, obtenerDocentes } from '../../../../services/docentes.service';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import FormularioDocente from '../../../../components/Dialog/Forms/Docentes/FormularioDocente';
import Controls from '../../../../components/Controls/Controls';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import { Columns } from './DocentesColumns';

import './SeccionDocentes.css';

const SeccionDocentes = () => {
    const [data, setData] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [idDocente, setIdDocente] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const cargarDatos = async () => {
        const data = await obtenerDocentes();
        setData(data);
    };

    const eliminarDocente = async () => {
        const data = await eliminarDocentes(idDocente);
        handleSnackbarOpen(data);
        if (data.status === "Exito") {
            cargarDatos();
        }
    };

    const handleChange = async (e) => {
        const result = await filtrarDocentesxBusqueda(e.target.value);
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

    const handleForm = (idDocente) => {
        setIdDocente(idDocente);
        setEstado(true);
    };

    const handleConfirm = (idDocente) => {
        setIdDocente(idDocente);
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
        <div className='docentes-container'>
            <AppBar
                sx={styles.appbar}
            >
                <Typography
                    sx={styles.typography}
                >Catálogo docentes</Typography>
            </AppBar>
            <div className='info-container'>
            <Card sx={styles.card}>
                    <div className='docentes-card-content'>
                        <div className='acciones-docentes'>
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
                        <div className='grid-docentes'>
                            <DefaultDataGrid
                                handleForm={handleForm}
                                handleConfirm={handleConfirm}
                                data={data}
                                columns={Columns}
                                idField='idDocente'
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <FormularioDocente
                estado={estado}
                setEstado={setEstado}
                idDocente={idDocente}
                onConfirm={handleSnackbarOpen}
            />
            <Confirmation
                estado={estadoConfirm}
                setEstado={setEstadoConfirm}
                onConfirm={eliminarDocente}
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
 
export default SeccionDocentes;