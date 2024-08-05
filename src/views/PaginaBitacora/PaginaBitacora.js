import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Card, Button } from '@mui/material';
import Controls from '../../components/Controls/Controls';
import Confirmation from '../../../src/components/Dialog/Confimation/Confirmation';
import AsistenciaDataGrid from '../../components/DataGrid/AsistenciaDataGrid';
import { obtenerPeriodos } from '../../services/periodos.service';
import { obtenerDepartamentos } from '../../services/departamentos.service';
import { Columns } from './BitacoraColumns';

import './PaginaBitacora.css';

const PaginaBitacora = () => {
    const [areaConocimiento, setAreaConocimiento] = useState(1);
    const [areasConocimiento, setAreasConocimiento] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [periodo, setPeriodo] = useState(1);
    const [estadoConfirm, setEstadoConfirm] = useState(false);

    const cargarDatos = async () => {
        const pe = await obtenerPeriodos();
        setPeriodos(pe);
        const dep = await obtenerDepartamentos();
        setAreasConocimiento(dep);
    };

    const handleConfirm = () => {
        setEstadoConfirm(true);
    };

    const confirmarAsistencia = async () => {

    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const data = [
        {
            idDepartamento: 1,
            AreaConocimiento: 'Agrícola',
            Carrera: 'Ingeniería Química',
            Docente: 'Ernesto Molina',
            Asignatura: 'Matemáticas II',
            Grupo: '2T2-QUI',
            Dia: '23/06/2024',
            Periodo: '2T',
            Asistencia: false,
        },
        {
            idDepartamento: 2,
            AreaConocimiento: 'Agrícola',
            Carrera: 'Ingeniería Agrícola',
            Docente: 'Richard Arauz',
            Asignatura: 'Matemáticas II',
            Grupo: '2T3-A',
            Dia: '23/06/2024',
            Periodo: '2T',
            Asistencia: false,
        },
        {
            idDepartamento: 3,
            AreaConocimiento: 'Agrícola',
            Carrera: 'Ingeniería Agrícola',
            Docente: 'prueba',
            Asignatura: 'Matemáticas II',
            Grupo: '2T2-A',
            Dia: '23/06/2024',
            Periodo: '2T',
            Asistencia: false,
        },
    ]


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
                                    label="Períodos"
                                    value={periodo}
                                    onChange={setPeriodo}
                                    items={periodos}
                                    keyField="idPeriodo"
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
                            <AsistenciaDataGrid
                                data={data}
                                columns={Columns}
                                idField='idDepartamento'
                            />
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
