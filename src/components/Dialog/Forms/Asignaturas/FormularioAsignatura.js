import React, { useEffect, useState } from 'react';
import { insertarAsignaturas, actualizarAsignaturas, obtenerAsignaturasxId } from '../../../../services/asignaturas.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Email } from '@mui/icons-material';
import Controls from '../../../Controls/Controls';

import './FormularioAsignatura.css';

const FormularioAsignatura = (props) => {
    const { estado, setEstado, idAsignatura, periodos, onConfirm } = props;

    const [nombre, setNombre] = useState('');
    const [periodo, setPeriodo] = useState(1);

    const handleClose = () => {
        setEstado(false);
    };

    const onSubmit = async () => {
        const modAsignatura = {
            idAsignatura,
            nombre,
            periodo
        }
        let result = null;
        if(idAsignatura){
            result = await actualizarAsignaturas(modAsignatura);
        }else{  
            result = await insertarAsignaturas(modAsignatura);
        }
        if(result.statusCode === 200){
            handleClose();
        }
        onConfirm(result);
    };

    const styles = {
        title: {
            backgroundColor: 'darkblue',
            color: 'white'
        }
    };

    useEffect(() => {
        const cargarDatos = async () => {
            const result = await obtenerAsignaturasxId(idAsignatura);
            setNombre(result.datos[0].Nombre);
            setPeriodo(result.datos[0].idPeriodo);
        };
        if (idAsignatura) {
            cargarDatos();
        };
    }, [idAsignatura]);

    return (
        <div className='main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idAsignatura ? "Editar asignatura" : "Agregar asignatura"}
                </DialogTitle>
                <DialogContent>
                    <div className='form-container'>
                        <div className='input-box'>
                            <Controls.TextInput
                                label="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='input-box'>
                            <Controls.SelectInput
                                label="Periodo"
                                value={periodo}
                                onChange={setPeriodo}
                                items={periodos}
                                keyField="idPeriodo" 
                                valueField="Nombre" 
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button onClick={onSubmit}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </div> 
    );
}
 
export default FormularioAsignatura;