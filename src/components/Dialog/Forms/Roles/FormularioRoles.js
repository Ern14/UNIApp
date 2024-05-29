import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Badge, Description } from '@mui/icons-material';
import { insertarRoles, actualizarRoles, obtenerRolxId } from '../../../../services/roles.service';
import Controls from '../../../Controls/Controls';

import './FormularioRoles.css';

const FormularioRoles = (props) => {
    const { estado, setEstado, idRol, onConfirm } = props;

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const onSubmit = async () => {
        const modRol = {
            idRol,
            nombre,
            descripcion
        }
        let result = null;
        if (idRol) {
            result = await actualizarRoles(modRol);
        } else {
            result = await insertarRoles(modRol);
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
            const result = await obtenerRolxId(idRol);
            setNombre(result.datos[0].Nombre);
            setDescripcion(result.datos[0].Descripcion);
        };
        if (idRol) {
            cargarDatos();
        };
    }, [idRol]);

    return (
        <div className='main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idRol ? "Editar rol" : "Agregar rol"}
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
                                            <Badge />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='input-box'>
                            <Controls.TextInput
                                label="Descripción"
                                value={descripcion}
                                onChange={e => setDescripcion(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Description />
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

export default FormularioRoles;