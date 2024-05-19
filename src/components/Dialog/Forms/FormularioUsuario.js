import React, { useEffect, useState } from 'react';
import { insertarUsuario } from '../../../services/usuarios.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Email, Password } from '@mui/icons-material';
import Controls from '../../Controls/Controls';

import './FormularioUsuario.css';

const FormularioUsuario = (props) => {
    const { estado, setEstado, idUsuario, roles } = props;

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [permiso, setPermiso] = useState('');

    const handleClose = () => {
        setEstado(false);
    };

    const cargarDatos = async () => {
        //const result = await obtenerRoles();
        console.log('Cargando datos de:', idUsuario);
    };

    const onSubmit = async () => {
        const modUsuario = {
            correo,
            contrasena,
            permiso
        }
        const result = await insertarUsuario(modUsuario);
        handleClose();
    };

    const permisos = roles;

    const styles = {
        title: {
            backgroundColor: 'darkblue',
            color: 'white'
        }
    };

    useEffect(() => {
        if (idUsuario) {
            cargarDatos();
        };
    }, [idUsuario]);

    return (
        <div className='main-container'>
            <Dialog
                open={estado}
            >
                <DialogTitle
                    sx={styles.title}
                >
                    {idUsuario ? "Editar usuario" : "Agregar usuario"}
                </DialogTitle>
                <DialogContent>
                    <div className='form-container'>
                        <div className='input-box'>
                            <Controls.TextInput
                                label="Correo"
                                onChange={(e) => setCorreo(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='input-box'>
                            <Controls.TextInput
                                label="Contraseña"
                                type="password"
                                onChange={e => setContrasena(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Password />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className='input-box'>
                            <Controls.SelectInput
                                label="Permiso"
                                onChange={setPermiso}
                                items={permisos}
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

export default FormularioUsuario;