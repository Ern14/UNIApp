import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Card, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { eliminarGrupos, filtrarGruposxBusqueda, obtenerGrupos } from '../../../../services/grupos.service';
import { obtenerCarreras } from '../../../../services/carreras.service';
import { obtenerPeriodos } from '../../../../services/periodos.service';
import DefaultDataGrid from '../../../../components/DataGrid/DefaultDataGrid';
import FormularioGrupo from '../../../../components/Dialog/Forms/Grupos/FormularioGrupo';
import Controls from '../../../../components/Controls/Controls';
import Confirmation from '../../../../components/Dialog/Confimation/Confirmation';
import { Columns } from './GruposColumns';

import './SeccionGrupos.css';

const SeccionGrupos = () => {
    const [data, setData] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [estado, setEstado] = useState(false);
    const [estadoConfirm, setEstadoConfirm] = useState(false);
    const [idGrupo, setIdGrupo] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const cargarDatos = async () => {
        const data = await obtenerGrupos();
        setData(data);
    };

    const cargarPeriodos = async () => {
        const result = await obtenerPeriodos();
        setPeriodos(result);
    };

    const cargarCarreras = async () => {
        const result = await obtenerCarreras();
        setCarreras(result);
    };

    const eliminarGrupo = async () => {
        const data = await eliminarGrupos(idGrupo);
        handleSnackbarOpen(data);
        if (data.status === "Exito") {
            cargarDatos();
        }
    };

    const handleChange = async (e) => {
        const result = await filtrarGruposxBusqueda(e.target.value);
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

    const handleForm = (idGrupo) => {
        setIdGrupo(idGrupo);
        setEstado(true);
    };

    const handleConfirm = (idGrupo) => {
        setIdGrupo(idGrupo);
        setEstadoConfirm(true);
    };

    useEffect(() => {
        cargarDatos();
        cargarPeriodos();
        cargarCarreras();
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
                >Catálogo grupos</Typography>
            </AppBar>
            <div className='info-container'>
            <Card sx={styles.card}>
                    <div className='grupo-card-content'>
                        <div className='acciones-grupo'>
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
                        <div className='grid-grupo'>
                            <DefaultDataGrid
                                handleForm={handleForm}
                                handleConfirm={handleConfirm}
                                data={data}
                                columns={Columns}
                                idField='idGrupo'
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <FormularioGrupo
                estado={estado}
                setEstado={setEstado}
                idGrupo={idGrupo}
                periodos={periodos}
                carreras={carreras}
                onConfirm={handleSnackbarOpen}
            />
            <Confirmation
                estado={estadoConfirm}
                setEstado={setEstadoConfirm}
                onConfirm={eliminarGrupo}
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
 
export default SeccionGrupos;