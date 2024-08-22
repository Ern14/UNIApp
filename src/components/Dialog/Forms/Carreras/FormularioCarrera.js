import React, { useEffect, useState } from 'react';
import { actualizarCarreras, insertarCarreras, obtenerCarreraxId } from '../../../../services/carreras.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Class, Description, Abc } from '@mui/icons-material';
import Controls from '../../../Controls/Controls';

import './FormularioCarrera.css';

const FormularioCarrera = (props) => {
    const { estado, setEstado, idCarrera, departamentos, onConfirm } = props;

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [abreviatura, setAbreviatura] = useState('');
    const [departamento, setDepartamento] = useState(1);


    const handleClose = () => {
        setEstado(false);
    };

    const onSubmit = async () => {
        const modCarrera = {
            idCarrera,
            departamento,
            nombre,
            descripcion,
            abreviatura
        }
        let result = null;
        if(idCarrera){
            result = await actualizarCarreras(modCarrera);
        }else{  
            result = await insertarCarreras(modCarrera);
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
            const result = await obtenerCarreraxId(idCarrera);
            setNombre(result.datos[0].Nombre);
            setAbreviatura(result.datos[0].Abreviatura);
            setDescripcion(result.datos[0].Descripcion);
            setDepartamento(result.datos[0].idDepartamento);
        };
        if (idCarrera) {
            cargarDatos();
        };
    }, [idCarrera]);

    return (
        <div className='carrera-main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idCarrera ? "Editar carrera" : "Agregar carrera"}
                </DialogTitle>
                <DialogContent>
                    <div className='carrera-form-container'>
                        <div className='carrera-input-box'>
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
                        <div className='carrera-input-box'>
                            <Controls.TextInput
                                label="Abreviatura"
                                value={abreviatura}
                                onChange={(e) => setAbreviatura(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Abc />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='carrera-input-box'>
                            <Controls.TextInput
                                label="Descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Description />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='input-box'>
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

export default FormularioCarrera;