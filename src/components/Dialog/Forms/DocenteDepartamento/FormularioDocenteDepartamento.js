import React, { useEffect, useState } from 'react';
import { insertarDocenteDepartamento, actualizarDocenteDepartamento, obtenerDocenteDepartamentoxId } from '../../../../services/docente-departamento.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Controls from '../../../Controls/Controls';

import './FormularioDocenteDepartamento.css';

const FormularioDocenteDepartamento = (props) => {
    const { estado, setEstado, departamentos, idDocenteDepartamento, idDocente, onConfirm } = props;

    const [departamento, setDepartamento] = useState('');

    const onSubmit = async () => {
        const modDocenteDepartamento = {
            idDocenteDepartamento,
            idDocente,
            departamento
        }
        let result = null;
        if (idDocenteDepartamento) {
            result = await actualizarDocenteDepartamento(modDocenteDepartamento);
        } else {
            result = await insertarDocenteDepartamento(modDocenteDepartamento);
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
            const result = await obtenerDocenteDepartamentoxId(idDocenteDepartamento);
            setDepartamento(result.datos[0].idDepartamento);
        };
        if (idDocenteDepartamento) {
            cargarDatos();
        };
    }, [idDocenteDepartamento]);

    return ( 
        <div className='grupo-main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idDocenteDepartamento ? "Editar departamento" : "Agregar departamento"}
                </DialogTitle>
                <DialogContent>
                    <div className='grupo-form-container'>
                        <div className='docente-departamento-input-box'>
                            <Controls.SelectInput
                                label="Área de conocimiento"
                                value={departamento}
                                onChange={setDepartamento}
                                items={departamentos}
                                keyField="idDepartamento" 
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
 
export default FormularioDocenteDepartamento;