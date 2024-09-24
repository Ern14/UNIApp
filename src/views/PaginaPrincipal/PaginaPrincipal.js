import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Card, MenuItem, Select } from '@mui/material';
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
    const [periodo, setPeriodo] = useState(6);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);

    const cargarDatos = async () => {
        const pe = await obtenerPeriodos();
        setPeriodos(pe);
        const dep = await obtenerDepartamentos();
        setAreasConocimiento(dep);
    };

    const [viewMode, setViewMode] = useState('Dia');  // "Dia", "Semanal", "Semestral"
    const [semestre, setSemestre] = useState(1);
    const [semana, setSemana] = useState(1);

    const handleViewModeChange = (event) => {
        setViewMode(event.target.value);
    };

    const handleSemestreChange = (event) => {
        setSemestre(event.target.value);
    };

    const handleSemanaChange = (event) => {
        setSemana(event.target.value);
    };

    useEffect(() => {
        cargarDatos();
        setSelectedDate(dayjs());
    }, []);
    
    useEffect(() => {
        const fechaSeleccionada = selectedDate.format('DD/MM/YYYY');
        if (fechaSeleccionada === '10/09/2024' && areaConocimiento === 1) {
            setBarData(dataset);
            setPieData(datapie);
        } else if (fechaSeleccionada === '10/09/2024' && areaConocimiento === 2) {
            setBarData(dataset2);
            setPieData(datapie2);
        } else {
            setBarData(dataset3);
            setPieData(datapie3);
        }
    }, [selectedDate, areaConocimiento]);

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

    const dataset = [
        {
            asistencia: 4,
            inasistencia: 2
        },
        {
            asistencia: 6,
            inasistencia: 0
        }
    ];

    const dataset2 = [
        {
            asistencia: 1,
            inasistencia: 0
        },
        {
            asistencia: 0,
            inasistencia: 0
        }
    ];

    const dataset3 = [
        {
            asistencia: 0,
            inasistencia: 0
        },
        {
            asistencia: 0,
            inasistencia: 0
        }
    ];

    const datapie = [
        { id: 0, value: 10, label: 'Asistencias' },
        { id: 1, value: 2, label: 'Inasistencias' },
    ];

    const datapie2 = [
        { id: 0, value: 1, label: 'Asistencias' },
        { id: 1, value: 0, label: 'Inasistencias' },
    ];

    const datapie3 = [
        { id: 0, value: 0, label: 'Asistencias' },
        { id: 1, value: 0, label: 'Inasistencias' },
    ];

    return (
        <div className='principal-container'>
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
                        <Select
                                value={viewMode}
                                onChange={handleViewModeChange}
                                sx={{ marginBottom: '20px' }}
                            >
                                <MenuItem value="Dia">Día</MenuItem>
                                <MenuItem value="Semanal">Semanal</MenuItem>
                                <MenuItem value="Semestral">Semestral</MenuItem>
                            </Select>

                            {/* Condicionales para mostrar componentes según la selección */}
                            {viewMode === 'Dia' && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Seleccione el día"
                                        value={selectedDate}
                                        onChange={(newValue) => setSelectedDate(newValue)}
                                    />
                                </LocalizationProvider>
                            )}

                            {viewMode === 'Semanal' && (
                                <div>
                                    <Select
                                        value={semestre}
                                        onChange={handleSemestreChange}
                                        sx={{ marginBottom: '20px' }}
                                    >
                                        <MenuItem value={1}>Semestre 1</MenuItem>
                                        <MenuItem value={2}>Semestre 2</MenuItem>
                                    </Select>
                                    <Select
                                        value={semana}
                                        onChange={handleSemanaChange}
                                        sx={{ marginBottom: '20px' }}
                                    >
                                        {Array.from({ length: 18 }, (_, index) => (
                                            <MenuItem key={index + 1} value={index + 1}>
                                                Semana {index + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            )}

                            {viewMode === 'Semestral' && (
                                <Select
                                    value={semestre}
                                    onChange={handleSemestreChange}
                                    sx={{ marginBottom: '20px' }}
                                >
                                    <MenuItem value={1}>Semestre 1</MenuItem>
                                    <MenuItem value={2}>Semestre 2</MenuItem>
                                </Select>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PaginaPrincipal;
