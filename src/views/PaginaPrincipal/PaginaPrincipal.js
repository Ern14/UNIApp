import React from 'react';
import { AppBar, Typography, Card } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';

import './PaginaPrincipal.css';

const PaginaPrincipal = () => {

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
                        <BarChart
                            dataset={dataset}
                            xAxis={[{ scaleType: 'band', data: ['Docente A', 'Docente B', 'Docente C'] }]}
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
                </Card>
            </div>
        </div>
    );
};

export default PaginaPrincipal;
