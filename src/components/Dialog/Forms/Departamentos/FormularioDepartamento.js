import React, { useEffect, useState } from 'react';
import { insertarDepartamentos, actualizarDepartamentos, obtenerDepartamentoxId } from '../../../../services/departamentos.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Class } from '@mui/icons-material';
import Controls from '../../../Controls/Controls';

import './FormularioDepartamento.css';

const FormularioDepartamento = ( props ) => {
    const { estado, setEstado, idDepartamento, onConfirm } = props;

    const [nombre, setNombre] = useState('');

    const onSubmit = async () => {
        const modDepartamento = {
            idDepartamento,
            nombre
        }
        let result = null;
        if (idDepartamento) {
            result = await actualizarDepartamentos(modDepartamento);
        } else {
            result = await insertarDepartamentos(modDepartamento);
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
            const result = await obtenerDepartamentoxId(idDepartamento);
            setNombre(result.datos[0].Nombre);
        };
        if (idDepartamento) {
            cargarDatos();
        };
    }, [idDepartamento]);

    return ( 
        <div className='departamento-main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idDepartamento ? "Editar área de conocimiento" : "Agregar área de conocimiento"}
                </DialogTitle>
                <DialogContent>
                    <div className='departamento-form-container'>
                        <div className='departamento-input-box'>
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
 
export default FormularioDepartamento;