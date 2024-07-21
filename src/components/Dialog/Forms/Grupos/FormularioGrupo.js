import React, { useEffect, useState } from 'react';
import { insertarGrupos, actualizarGrupos, obtenerGrupoxId } from '../../../../services/grupos.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Class } from '@mui/icons-material';
import Controls from '../../../Controls/Controls';

import './FormularioGrupo.css';

const FormularioGrupo = (props) => {
    const { estado, setEstado, periodos, carreras, idGrupo, onConfirm } = props;

    const [nombre, setNombre] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [carrera, setCarrera] = useState('');

    const onSubmit = async () => {
        const modGrupo = {
            idGrupo,
            periodo,
            carrera,
            nombre
        }
        let result = null;
        if (idGrupo) {
            result = await actualizarGrupos(modGrupo);
        } else {
            result = await insertarGrupos(modGrupo);
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
            const result = await obtenerGrupoxId(idGrupo);
            setNombre(result.datos[0].Nombre);
            setPeriodo(result.datos[0].idPeriodo);
            setCarrera(result.datos[0].idCarrera);
        };
        if (idGrupo) {
            cargarDatos();
        };
    }, [idGrupo]);

    return ( 
        <div className='grupo-main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idGrupo ? "Editar grupo" : "Agregar grupo"}
                </DialogTitle>
                <DialogContent>
                    <div className='grupo-form-container'>
                        <div className='grupo-input-box'>
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
                        <div className='input-box'>
                            <Controls.SelectInput
                                label="Período"
                                value={periodo}
                                onChange={setPeriodo}
                                items={periodos}
                                keyField="idPeriodo" 
                                valueField="Nombre" 
                            />
                        </div>
                        <div className='input-box'>
                            <Controls.SelectInput
                                label="Carrera"
                                value={carrera}
                                onChange={setCarrera}
                                items={carreras}
                                keyField="idCarrera" 
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
 
export default FormularioGrupo;