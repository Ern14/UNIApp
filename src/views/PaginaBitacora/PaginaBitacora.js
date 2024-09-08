import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Card, Button } from '@mui/material';
import Controls from '../../components/Controls/Controls';
import Confirmation from '../../../src/components/Dialog/Confimation/Confirmation';
import AsistenciaDataGrid from '../../components/DataGrid/AsistenciaDataGrid';
import { obtenerAsignaturas } from '../../services/asignaturas.service';
import { obtenerBitacora } from '../../services/bitacora.service';
import { obtenerDepartamentos } from '../../services/departamentos.service';
import { Columns } from './BitacoraColumns';

import './PaginaBitacora.css';

const PaginaBitacora = () => {
    const [datos, setDatos] = useState([]);
    const [areaConocimiento, setAreaConocimiento] = useState(1);
    const [areasConocimiento, setAreasConocimiento] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [asignatura, setAsignatura] = useState(2);
    const [estadoConfirm, setEstadoConfirm] = useState(false);

    const cargarDatos = async () => {
        const asig = await obtenerAsignaturas();
        setAsignaturas(asig);
        const dep = await obtenerDepartamentos();
        setAreasConocimiento(dep);
        /*const data = await obtenerBitacora(areaConocimiento, asignatura);
        const datosModificados = data.map(dato => ({
            ...dato,
            idAsistencia: dato.idDocenteAsignatura
        }));
        setDatos(datosModificados);*/
    };

    const cargarBitacora = async () => {
        const data = await obtenerBitacora(areaConocimiento, asignatura);
        const datosModificados = data.map(dato => ({
            ...dato,
            idAsistencia: dato.idDocenteAsignatura
        }));
        setDatos(datosModificados);
    };

    const handleConfirm = () => {
        setEstadoConfirm(true);
    };

    const confirmarAsistencia = async () => {

    };

    useEffect(() => {
        const cargar = async () => {
            await cargarDatos();
            await cargarBitacora();
        };
        cargar();
    }, []);

    useEffect(() => {
        cargarBitacora();
    }, [areaConocimiento, asignatura]);

    /*const data = [
        {
            idAsistencia: 1,
            NombreDepartamento: 'Agrícola',
            NombreCarrera: 'Ingeniería Química',
            NombreDocente: 'Ernesto Molina',
            NombreAsignatura: 'Matemáticas II',
            NombreGrupo: '2T2-QUI',
            Dia: '10/09/2024',
            Periodo: '2T',
            Asistencia: false,
        },
        {
            idAsistencia: 2,
            NombreDepartamento: 'Agrícola',
            NombreCarrera: 'Ingeniería Agrícola',
            NombreDocente: 'Richard Arauz',
            NombreAsignatura: 'Matemáticas II',
            NombreGrupo: '2T3-A',
            Dia: '10/09/2024',
            Periodo: '2T',
            Asistencia: false,
        }
    ]

    const data2 = [
        {
            idAsistencia: 1,
            NombreDepartamento: 'Ingeniería y afines',
            NombreCarrera: 'Arquitectura',
            NombreDocente: 'Ernesto Molina',
            NombreAsignatura: 'Dibujo Téctico I',
            NombreGrupo: '2T1-A',
            Dia: '10/09/2024',
            Periodo: '2T',
            Asistencia: false,
        }
    ]*/


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
        <div className='bitacora-container'>
            <AppBar
                sx={styles.appbar}
            >
                <Typography
                    sx={styles.typography}
                >Bitácora</Typography>
            </AppBar>
            <div className='info-container'>
                <Card sx={styles.card}>
                    <div className='bitacora-card-content'>
                        <div className='top-bitacora'>
                            <div className='filtros-bitacora'>
                                <Controls.SelectInput
                                    label="Areá de conocimiento"
                                    value={areaConocimiento}
                                    onChange={setAreaConocimiento}
                                    items={areasConocimiento}
                                    keyField="idDepartamento"
                                    valueField="Nombre"
                                />
                                <Controls.SelectInput
                                    label="Asignaturas"
                                    value={asignatura}
                                    onChange={setAsignatura}
                                    items={asignaturas}
                                    keyField="idAsignatura"
                                    valueField="Nombre"
                                />
                            </div>
                            <div className='confirmar-bitacora'>
                                <Button
                                    sx={styles.button}
                                    variant="contained"
                                    onClick={() => handleConfirm()}
                                >
                                    Confirmar
                                </Button>
                            </div>
                        </div>
                        <div className='bitacora-departamentos'>
                            {datos.length > 0 ? (
                                <AsistenciaDataGrid
                                    data={datos}
                                    columns={Columns}
                                    idField='idAsistencia'
                                />
                            ) : (
                                <Typography>No hay datos disponibles</Typography>
                            )}
                        </div>
                    </div>

                </Card>
            </div>
            <Confirmation
                estado={estadoConfirm}
                setEstado={setEstadoConfirm}
                onConfirm={confirmarAsistencia}
            />
        </div>
    );
};

export default PaginaBitacora;
