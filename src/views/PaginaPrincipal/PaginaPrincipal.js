import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Typography, Card, MenuItem, Select, Grid } from '@mui/material';
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

    //const [barData, setBarData] = useState([]);
    //const [pieData, setPieData] = useState([]);

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

    const data = [
        { carrera: 'Agrícola', asistencias: 23, ausencias: 9, porcentajeAsistencias: '72%', porcentajeAusencias: '28%' },
        { carrera: 'Química', asistencias: 29, ausencias: 10, porcentajeAsistencias: '74%', porcentajeAusencias: '26%' },
        { carrera: 'Computación', asistencias: 48, ausencias: 17, porcentajeAsistencias: '74%', porcentajeAusencias: '26%' },
        { carrera: 'Sistema', asistencias: 47, ausencias: 22, porcentajeAsistencias: '68%', porcentajeAusencias: '32%' },
        { carrera: 'Electrónica', asistencias: 25, ausencias: 10, porcentajeAsistencias: '71%', porcentajeAusencias: '29%' },
        { carrera: 'Telecom', asistencias: 12, ausencias: 5, porcentajeAsistencias: '71%', porcentajeAusencias: '29%' },
        { carrera: 'Arquitectura', asistencias: 82, ausencias: 39, porcentajeAsistencias: '68%', porcentajeAusencias: '32%' },
        { carrera: 'Civil', asistencias: 67, ausencias: 20, porcentajeAsistencias: '77%', porcentajeAusencias: '23%' },
        { carrera: 'Eléctrica', asistencias: 30, ausencias: 10, porcentajeAsistencias: '75%', porcentajeAusencias: '25%' },
        { carrera: 'Industrial', asistencias: 67, ausencias: 25, porcentajeAsistencias: '73%', porcentajeAusencias: '27%' },
        { carrera: 'Mecánica', asistencias: 25, ausencias: 12, porcentajeAsistencias: '68%', porcentajeAusencias: '32%' }
    ];

    const barData = {
        series: [
            {
                label: 'Inasistencias',
                data: data.map((row) => row.ausencias)// Datos de inasistencias
            }
        ],
        xAxis: [
            {
                scaleType: 'band', 
                data: data.map((row) => row.carrera) 
            }
        ]
    };

    const pieData = [
        { id: 'Asistencias', label: 'Asistencias', value: data.reduce((acc, row) => acc + row.asistencias, 0) },
        { id: 'Ausencias', label: 'Ausencias', value: data.reduce((acc, row) => acc + row.ausencias, 0) }
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
                <Card sx={{ height: '80vh', width: '90%' }}>
                    <div className='dashboard-card-content'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                                            <Select value={semestre} onChange={handleSemestreChange} sx={{ marginBottom: '20px' }}>
                                                <MenuItem value={1}>Semestre 1</MenuItem>
                                                <MenuItem value={2}>Semestre 2</MenuItem>
                                            </Select>
                                            <Select value={semana} onChange={handleSemanaChange} sx={{ marginBottom: '20px' }}>
                                                {Array.from({ length: 18 }, (_, index) => (
                                                    <MenuItem key={index + 1} value={index + 1}>
                                                        Semana {index + 1}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    )}

                                    {viewMode === 'Semestral' && (
                                        <Select value={semestre} onChange={handleSemestreChange} sx={{ marginBottom: '20px' }}>
                                            <MenuItem value={1}>Semestre 1</MenuItem>
                                            <MenuItem value={2}>Semestre 2</MenuItem>
                                        </Select>
                                    )}
                                </div>

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Carrera</TableCell>
                                                <TableCell align="right"># de Asistencias</TableCell>
                                                <TableCell align="right"># de Ausencias</TableCell>
                                                <TableCell align="right">% de Asistencias</TableCell>
                                                <TableCell align="right">% de Ausencias</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((row) => (
                                                <TableRow key={row.carrera}>
                                                    <TableCell component="th" scope="row">
                                                        {row.carrera}
                                                    </TableCell>
                                                    <TableCell align="right">{row.asistencias}</TableCell>
                                                    <TableCell align="right">{row.ausencias}</TableCell>
                                                    <TableCell align="right">{row.porcentajeAsistencias}</TableCell>
                                                    <TableCell align="right">{row.porcentajeAusencias}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            <Grid item xs={6}>
                                <BarChart
                                    title="Inasistencias por Carrera"
                                    series={barData.series} 
                                    xAxis={barData.xAxis}
                                    width={500}
                                    height={400}
                                />
                                <PieChart
                                        series={[
                                            {
                                                innerRadius: 0,
                                                outerRadius: 80,
                                                data: pieData
                                            }
                                        ]}
                                        width={500}
                                        height={300}
                                    />
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PaginaPrincipal;
