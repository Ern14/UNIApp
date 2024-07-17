import React, { useEffect, useState } from 'react';
import { insertarAsignaturas, actualizarAsignaturas, obtenerAsignaturasxId } from '../../../../services/asignaturas.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Email } from '@mui/icons-material';
import Controls from '../../../Controls/Controls';

import './FormularioAsignatura.css';

const FormularioAsignatura = (props) => {
    const { estado, setEstado, idAsignatura, onConfirm } = props;

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleClose = () => {
        setEstado(false);
    };

    const onSubmit = async () => {
        const modAsignatura = {
            idAsignatura,
            nombre,
            descripcion
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
            setDescripcion(result.datos[0].Descripcion);
        };
        if (idAsignatura) {
            cargarDatos();
        };
    }, [idAsignatura]);

    return (
        <div className='asignatura-main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idAsignatura ? "Editar asignatura" : "Agregar asignatura"}
                </DialogTitle>
                <DialogContent>
                    <div className='asignatura-form-container'>
                        <div className='asignatura-input-box'>
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
                        <div className='asignatura-input-box'>
                            <Controls.TextInput
                                label="Descripción"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
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