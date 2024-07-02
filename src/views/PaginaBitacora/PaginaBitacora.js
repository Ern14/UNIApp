import React, { useState } from 'react';
import { AppBar, Typography, Card, Snackbar, Alert, Button } from '@mui/material';
import Controls from '../../components/Controls/Controls';
import AsistenciaDataGrid from '../../components/DataGrid/AsistenciaDataGrid';
import { Columns } from './BitacoraColumns';

import './PaginaBitacora.css';

const PaginaBitacora = () => {
    const [areaConocimiento, setAreaConocimiento] = useState(1);
    const [periodo, setPeriodo] = useState(1);

    const areasConocimiento = [
        {
            idDepartamento: 1,
            Nombre: 'Agroindustrial y Química'
        },
        {
            idDepartamento: 2,
            Nombre: 'Ingeniería, construcción y afines'
        },
        {
            idDepartamento: 3,
            Nombre: 'Tecnología de la información y comunicación'
        }
    ]

    const periodos = [
        {
            idDireccion: 1,
            Nombre: 'M1'
        },
        {
            idDireccion: 2,
            Nombre: 'M2'
        },
        {
            idDireccion: 3,
            Nombre: 'M3'
        },
        {
            idDireccion: 4,
            Nombre: 'T1'
        },
        {
            idDireccion: 5,
            Nombre: 'T2'
        },
        {
            idDireccion: 6,
            Nombre: 'T3'
        },
        {
            idDireccion: 7,
            Nombre: 'N1'
        },
        {
            idDireccion: 8,
            Nombre: 'N2'
        },
    ]

    const data = [
        {
            idDepartamento: 1,
            AreaConocimiento: 'Agrícola y Química',
            Carrera: 'Ingeniería Química',
            Docente: 'Ernesto Molina',
            Asignatura: 'Matemáticas II',
            Grupo: '2T3-QUI',
            Dia: '23/06/2024',
            Periodo: '2T',
        },
        {
            idDepartamento: 2,
            AreaConocimiento: 'Agrícola y Química',
            Carrera: 'Ingeniería Agrícola',
            Docente: 'Richard Arauz',
            Asignatura: 'Matemáticas III',
            Grupo: '3T2-A',
            Dia: '23/06/2024',
            Periodo: '3T',
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
                                    keyField="idDireccion"
                                    valueField="Nombre"
                                />
                            </div>
                            <div className='confirmar-bitacora'>
                                <Button
                                    sx={styles.button}
                                    variant="contained"
                                    onClick={() => console.log("confirmar")}
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
        </div>
    );
};

export default PaginaBitacora;
