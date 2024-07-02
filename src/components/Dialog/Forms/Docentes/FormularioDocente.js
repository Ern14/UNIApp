import React, { useEffect, useState } from 'react';
import { insertarDocentes, actualizarDocentes, obtenerDocentexId } from '../../../../services/docentes.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Class } from '@mui/icons-material';
import Controls from '../../../Controls/Controls';

import './FormularioDocente.css';

const FormularioDocente = (props) => {
    const { estado, setEstado, idDocente, onConfirm } = props;

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const onSubmit = async () => {
        const modDocente = {
            idDocente,
            nombre,
            apellido
        }
        let result = null;
        if (idDocente) {
            result = await actualizarDocentes(modDocente);
        } else {
            result = await insertarDocentes(modDocente);
        }
        if (result.statusCode === 200) {
            handleClose();
        }
        onConfirm(result);
    };

    const handleClose = () => {
        setEstado(false);
    };

    const styles = {
        title: {
            backgroundColor: 'darkblue',
            color: 'white'
        }
    };

    useEffect(() => {
        const cargarDatos = async () => {
            const result = await obtenerDocentexId(idDocente);
            setNombre(result.datos[0].Nombre);
            setApellido(result.datos[0].Apellido);
        };
        if (idDocente) {
            cargarDatos();
        };
    }, [idDocente]);

    return (
        <div className='docentes-main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idDocente ? "Editar docente" : "Agregar docente"}
                </DialogTitle>
                <DialogContent>
                    <div className='docentes-form-container'>
                        <div className='docentes-input-box'>
                            <Controls.TextInput
                                label="Nombres"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Class />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='docentes-input-box'>
                            <Controls.TextInput
                                label="Apellidos"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Class />
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

export default FormularioDocente;