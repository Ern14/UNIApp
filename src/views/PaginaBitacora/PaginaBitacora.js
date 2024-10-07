import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Card, Button } from '@mui/material';
import Controls from '../../components/Controls/Controls';
import Confirmation from '../../../src/components/Dialog/Confimation/Confirmation';
import AsistenciaDataGrid from '../../components/DataGrid/AsistenciaDataGrid';
import { obtenerAsignaturas } from '../../services/asignaturas.service';
import { obtenerBitacora } from '../../services/bitacora.service';
import { obtenerCarreras } from '../../services/carreras.service';
import { obtenerPeriodos } from '../../services/periodos.service';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Columns } from './BitacoraColumns';
import { data1, data2, data3, data4 } from '../../dummy/dummyBitacora';
import dayjs from 'dayjs';

import './PaginaBitacora.css';

const PaginaBitacora = () => {
    const [datos, setDatos] = useState([]);
    const [carrera, setCarrera] = useState(1);
    const [carreras, setCarreras] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [asignatura, setAsignatura] = useState(2);
    const [periodos, setPeriodos] = useState([]);
    const [periodo, setPeriodo] = useState(1);
    const [estadoConfirm, setEstadoConfirm] = useState(false);

    const [selectedDate, setSelectedDate] = useState(dayjs());

    const [presentes, setPresentes] = useState(0);
    const [ausentes, setAusentes] = useState(0);
    const [porcentajePresentes, setPorcentajePresentes] = useState(0);
    const [porcentajeAusentes, setPorcentajeAusentes] = useState(0);

    const cargarDatos = async () => {
        const asig = await obtenerAsignaturas();
        setAsignaturas(asig);
        const dep = await obtenerCarreras();
        setCarreras(dep);
        const per = await obtenerPeriodos();
        setPeriodos(per);
        /*const data = await obtenerBitacora(areaConocimiento, asignatura);
        const datosModificados = data.map(dato => ({
            ...dato,
            idAsistencia: dato.idDocenteAsignatura
        }));
        setDatos(datosModificados);*/
    };

    const cargarBitacora = async () => {
        //const data = await obtenerBitacora(carrera, asignatura);
        /*const datosModificados = data.map(dato => ({
            ...dato,
            idAsistencia: dato.idDocenteAsignatura
        }));*/
        setDatos(data1);
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

    const calcularAsistencias = (data) => {
        const total = data.length;
        const presentes = data.filter(dato => dato.FirmaEntrada || dato.FirmaSalida).length;
        const ausentes = total - presentes;

        const porcentajePresentes = (presentes / total) * 100;
        const porcentajeAusentes = (ausentes / total) * 100;

        setPresentes(presentes);
        setAusentes(ausentes);
        setPorcentajePresentes(porcentajePresentes.toFixed(2));
        setPorcentajeAusentes(porcentajeAusentes.toFixed(2));
    };

    const handleAsistenciaChange = (updatedData) => {
        // Llama a calcularAsistencias con los datos actualizados
        calcularAsistencias(updatedData);
    };

    /*useEffect(() => {
        cargarBitacora();
    }, [carrera, asignatura,periodo]);*/

    useEffect(() => {
        const calcularAsistencia = () => {
            const total = datos.length;
            const presentes = datos.filter(d => d.FirmaEntrada || d.FirmaSalida).length;
            const ausentes = total - presentes;

            setPresentes(presentes);
            setAusentes(ausentes);

            if (total > 0) {
                setPorcentajePresentes(((presentes / total) * 100).toFixed(2));
                setPorcentajeAusentes(((ausentes / total) * 100).toFixed(2));
            } else {
                setPorcentajePresentes(0);
                setPorcentajeAusentes(0);
            }
        };

        calcularAsistencia();
    }, [datos]);

    useEffect(() => {
        const recargar = async () => {
            setDatos([]); // Forzar que React note el cambio de estado
            setTimeout(() => { // Usar un pequeño retraso para asegurar la actualización
                switch (periodo) {
                    case 1:
                        setDatos([...data1]); // Forzar una nueva referencia
                        break;
                    case 2:
                        setDatos([...data2]);
                        break;
                    case 3:
                        setDatos([...data3]);
                        break;
                    case 4:
                        setDatos([...data4]);
                        break;
                    default:
                        setDatos([]); // Limpiar la tabla si no hay coincidencia
                        break;
                }
            }, 0);
        }
        recargar();

    }, [periodo]);

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
        },
        stats: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px'
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
            <div className='info-bitacora'>
                <Card sx={styles.card}>
                    <div className='bitacora-card-content'>
                        <div className='top-bitacora'>
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
                            <div className='filtros-bitacora'>
                                <Controls.SelectInput
                                    label="Carrera"
                                    value={carrera}
                                    onChange={setCarrera}
                                    items={carreras}
                                    keyField="idCarrera"
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
                        <div style={styles.stats}>
                            <Typography>Presente: {presentes}</Typography>
                            <Typography>Ausente: {ausentes}</Typography>
                            <Typography>Porcentaje Presente: {porcentajePresentes}%</Typography>
                            <Typography>Porcentaje Ausente: {porcentajeAusentes}%</Typography>
                        </div>
                        <div className='bitacora-departamentos'>
                            {datos.length > 0 ? (
                                <AsistenciaDataGrid
                                    data={datos}
                                    columns={Columns}
                                    idField='idAsistencia'
                                    onAsistenciaChange={handleAsistenciaChange}
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
