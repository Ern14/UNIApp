import React, { useEffect, useState } from 'react';
import { insertarCarreraAsignatura, actualizarCarreraAsignatura, obtenerCarreraAsignaturaxId } from '../../../../services/carrera-asignatura.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Controls from '../../../Controls/Controls';

import './FormularioCarreraAsignatura.css';

const FormularioCarreraAsignatura = (props) => {
    const { estado, setEstado, asignaturas, idCarreraAsignatura, idCarrera, onConfirm } = props;

    const [asignatura, setAsignatura] = useState('');

    const onSubmit = async () => {
        const modCarreraAsignatura = {
            idCarreraAsignatura,
            idCarrera,
            asignatura
        }
        let result = null;
        if (idCarreraAsignatura) {
            result = await actualizarCarreraAsignatura(modCarreraAsignatura);
        } else {
            result = await insertarCarreraAsignatura(modCarreraAsignatura);
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
        console.log(idCarreraAsignatura)
        const cargarDatos = async () => {
            const result = await obtenerCarreraAsignaturaxId(idCarreraAsignatura);
            setAsignatura(result.datos[0].idAsignatura);
        };
        if (idCarreraAsignatura) {
            cargarDatos();
        };
    }, [idCarreraAsignatura]);

    return ( 
        <div className='grupo-main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idCarreraAsignatura ? "Editar carrera" : "Agregar carrera"}
                </DialogTitle>
                <DialogContent>
                    <div className='grupo-form-container'>
                        <div className='carrera-asignatura-input-box'>
                            <Controls.SelectInput
                                label="Asignatura"
                                value={asignatura}
                                onChange={setAsignatura}
                                items={asignaturas}
                                keyField="idAsignatura" 
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
 
export default FormularioCarreraAsignatura;