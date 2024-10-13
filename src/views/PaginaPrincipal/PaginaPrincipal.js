import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Typography, Card, MenuItem, Select, Grid } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const PaginaPrincipal = () => {
    const [viewMode, setViewMode] = useState('Dia');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [semestre, setSemestre] = useState(1);
    const [semana, setSemana] = useState(1);
    const [data, setData] = useState([]);

    const dailyData = [
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
    const weeklyData = [
        { carrera: 'Agrícola', asistencias: 117, ausencias: 47, porcentajeAsistencias: '71%', porcentajeAusencias: '29%' },
        { carrera: 'Química', asistencias: 145, ausencias: 49, porcentajeAsistencias: '75%', porcentajeAusencias: '25%' },
        { carrera: 'Computación', asistencias: 238, ausencias: 87, porcentajeAsistencias: '73%', porcentajeAusencias: '27%' },
        { carrera: 'Sistema', asistencias: 238, ausencias: 109, porcentajeAsistencias: '69%', porcentajeAusencias: '31%' },
        { carrera: 'Electrónica', asistencias: 124, ausencias: 50, porcentajeAsistencias: '71%', porcentajeAusencias: '29%' },
        { carrera: 'Telecom', asistencias: 62, ausencias: 27, porcentajeAsistencias: '70%', porcentajeAusencias: '30%' },
        { carrera: 'Arquitectura', asistencias: 410, ausencias: 193, porcentajeAsistencias: '68%', porcentajeAusencias: '32%' },
        { carrera: 'Civil', asistencias: 333, ausencias: 98, porcentajeAsistencias: '77%', porcentajeAusencias: '23%' },
        { carrera: 'Eléctrica', asistencias: 148, ausencias: 48, porcentajeAsistencias: '66%', porcentajeAusencias: '34%' },
        { carrera: 'Industrial', asistencias: 337, ausencias: 124, porcentajeAsistencias: '73%', porcentajeAusencias: '27%' },
        { carrera: 'Mecánica', asistencias: 125, ausencias: 58, porcentajeAsistencias: '68%', porcentajeAusencias: '32%' }
    ];
    const semesterData = [
        { carrera: 'Agrícola', asistencias: 2106, ausencias: 846, porcentajeAsistencias: '71%', porcentajeAusencias: '29%' },
        { carrera: 'Química', asistencias: 2610, ausencias: 882, porcentajeAsistencias: '75%', porcentajeAusencias: '25%' },
        { carrera: 'Computación', asistencias: 4284, ausencias: 1566, porcentajeAsistencias: '73%', porcentajeAusencias: '27%' },
        { carrera: 'Sistema', asistencias: 4284, ausencias: 1962, porcentajeAsistencias: '69%', porcentajeAusencias: '31%' },
        { carrera: 'Electrónica', asistencias: 2232, ausencias: 900, porcentajeAsistencias: '71%', porcentajeAusencias: '29%' },
        { carrera: 'Telecom', asistencias: 1116, ausencias: 486, porcentajeAsistencias: '70%', porcentajeAusencias: '30%' },
        { carrera: 'Arquitectura', asistencias: 7380, ausencias: 3474, porcentajeAsistencias: '68%', porcentajeAusencias: '32%' },
        { carrera: 'Civil', asistencias: 5994, ausencias: 1764, porcentajeAsistencias: '77%', porcentajeAusencias: '23%' },
        { carrera: 'Eléctrica', asistencias: 2664, ausencias: 864, porcentajeAsistencias: '75%', porcentajeAusencias: '25%' },
        { carrera: 'Industrial', asistencias: 6066, ausencias: 2232, porcentajeAsistencias: '73%', porcentajeAusencias: '27%' },
        { carrera: 'Mecánica', asistencias: 2250, ausencias: 1044, porcentajeAsistencias: '68%', porcentajeAusencias: '32%' }
    ];

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
        if (viewMode === 'Dia') {
            setData(dailyData);
        } else if (viewMode === 'Semanal') {
            setData(weeklyData);
        } else if (viewMode === 'Semestral') {
            setData(semesterData);
        }
    }, [viewMode, selectedDate, semana, semestre]);

    const barData = {
        series: [
            {
                label: 'Inasistencias',
                data: data.map((row) => row.ausencias)
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
        }
    };

    return (
        <div className='principal-container'>
            <AppBar sx={styles.appbar}>
                <Typography sx={styles.typography}>Dashboard</Typography>
            </AppBar>
            <div className='info-container'>
                <Card sx={styles.card}>
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

                                    {/* Renderizar controles según el modo seleccionado */}
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