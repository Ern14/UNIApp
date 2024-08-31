import React, { useEffect, useState } from 'react';
import { insertarDocenteAsignatura, actualizarDocenteAsignatura, obtenerDocenteAsignaturaxId } from '../../../../services/docente-asignatura.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Controls from '../../../Controls/Controls';

import './FormularioDocenteAsignatura.css';

const FormularioDocenteAsignatura = (props) => {
    const { estado, setEstado, docentes, idDocenteAsignatura, idAsignatura, onConfirm } = props;

    const [docente, setDocente] = useState('');

    const onSubmit = async () => {
        const modDocenteAsignatura = {
            idDocenteAsignatura,
            docente,
            idAsignatura
        }
        let result = null;
        if (idDocenteAsignatura) {
            result = await actualizarDocenteAsignatura(modDocenteAsignatura);
        } else {
            result = await insertarDocenteAsignatura(modDocenteAsignatura);
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
            const result = await obtenerDocenteAsignaturaxId(idDocenteAsignatura);
            setDocente(result.datos[0].idDocente);
        };
        if (idDocenteAsignatura) {
            cargarDatos();
        };
    }, [idDocenteAsignatura]);

    return ( 
        <div className='grupo-main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idDocenteAsignatura ? "Editar asignatura" : "Agregar asignatura"}
                </DialogTitle>
                <DialogContent>
                    <div className='grupo-form-container'>
                        <div className='docente-asignatura-input-box'>
                            <Controls.SelectInput
                                label="Docente"
                                value={docente}
                                onChange={setDocente}
                                items={docentes}
                                keyField="idDocente" 
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
 
export default FormularioDocenteAsignatura;