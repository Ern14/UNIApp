import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Card } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import Controls from '../../components/Controls/Controls';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { obtenerPeriodos } from '../../services/periodos.service';
import { obtenerDepartamentos } from '../../services/departamentos.service';
import dayjs from 'dayjs';

import './PaginaPrincipal.css';

const PaginaPrincipal = () => {
    const [areaConocimiento, setAreaConocimiento] = useState(1);
    const [areasConocimiento, setAreasConocimiento] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [periodo, setPeriodo] = useState(1);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const cargarDatos = async () => {
        const pe = await obtenerPeriodos();
        setPeriodos(pe);
        const dep = await obtenerDepartamentos();
        setAreasConocimiento(dep);
    };

    useEffect(() => {
        cargarDatos();
        setSelectedDate(dayjs());
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
            height: '90vh',
            width: '90%'
        },
        button: {
            backgroundColor: 'darkblue'
        }
    };

    const dataset = [
        {
            asistencia: 4,
            inasistencia: 2
        },
        {
            asistencia: 6,
            inasistencia: 0
        },
        {
            asistencia: 3,
            inasistencia: 3
        }
    ];

    return (
        <div className='container'>
            <AppBar
                sx={styles.appbar}
            >
                <Typography
                    sx={styles.typography}
                >Dashboard</Typography>
            </AppBar>
            <div className='info-container'>
                <Card sx={styles.card}>
                    <div className='dashboard-card-content'>
                        <div className='top-inicio'>
                            <div className='top-date'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Fecha"
                                            value={selectedDate}
                                            onChange={(newValue) => {
                                                setSelectedDate(newValue);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className='top-date'>
                                <Controls.SelectInput
                                    label="Areá de conocimiento"
                                    value={areaConocimiento}
                                    onChange={setAreaConocimiento}
                                    items={areasConocimiento}
                                    keyField="idDepartamento"
                                    valueField="Nombre"
                                />
                            </div>
                            <div className='top-input'>
                                <Controls.SelectInput
                                    label="Períodos"
                                    value={periodo}
                                    onChange={setPeriodo}
                                    items={periodos}
                                    keyField="idPeriodo"
                                    valueField="Nombre"
                                />
                            </div>
                        </div>

                        <div className='graficos-inicio'>
                            <BarChart
                                dataset={dataset}
                                xAxis={[{ scaleType: 'band', data: ['Ernesto Molina', 'Richard Arauz', 'prueba'] }]}
                                series={[
                                    { dataKey: 'asistencia', label: 'Asistencias' },
                                    { dataKey: 'inasistencia', label: 'Inasistencias' },
                                ]}
                                width={500}
                                height={300}
                            />
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 13, label: 'Asistencias' },
                                            { id: 1, value: 5, label: 'Inasistencias' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />

                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PaginaPrincipal;
