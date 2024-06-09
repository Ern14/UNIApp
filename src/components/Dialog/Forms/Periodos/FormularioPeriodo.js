import React, { useEffect, useState } from 'react';
import { insertarPeriodos, actualizarPeriodos, obtenerPeriodoxId } from '../../../../services/periodos.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Class } from '@mui/icons-material';
import Controls from '../../../Controls/Controls';

import './FormularioPeriodo.css';

const FormularioPeriodo = ( props ) => {
    const { estado, setEstado, idPeriodo, onConfirm } = props;

    const [nombre, setNombre] = useState('');

    const onSubmit = async () => {
        const modPeriodo = {
            idPeriodo,
            nombre
        }
        let result = null;
        if (idPeriodo) {
            result = await actualizarPeriodos(modPeriodo);
        } else {
            result = await insertarPeriodos(modPeriodo);
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
            const result = await obtenerPeriodoxId(idPeriodo);
            setNombre(result.datos[0].Nombre);
        };
        if (idPeriodo) {
            cargarDatos();
        };
    }, [idPeriodo]);

    return ( 
        <div className='periodo-main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idPeriodo ? "Editar periodo" : "Agregar periodo"}
                </DialogTitle>
                <DialogContent>
                    <div className='periodo-form-container'>
                        <div className='periodo-input-box'>
                            <Controls.TextInput
                                label="Nombre"
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
 
export default FormularioPeriodo;