import React, { useEffect, useState } from 'react';
import { actualizarUsuario, insertarUsuario, obtenerUsuarioxId } from '../../../services/usuarios.service';
import { Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Button } from "@mui/material";
import { Email, Password } from '@mui/icons-material';
import Controls from '../../Controls/Controls';
import { useAuth } from '../../../context/authContext';

import './FormularioUsuario.css';

const FormularioUsuario = (props) => {
    const { estado, setEstado, idUsuario, roles, carreras, onConfirm } = props;

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [permiso, setPermiso] = useState(1);
    const [carrera, setCarrera] = useState(1);

    const { user } = useAuth();

    const handleClose = () => {
        setEstado(false);
    };

    const onSubmit = async () => {
        const modUsuario = {
            idUsuario,
            correo,
            contrasena,
            permiso
        }
        let result = null;
        if(idUsuario){
            result = await actualizarUsuario(modUsuario);
        }else{  
            result = await insertarUsuario(modUsuario);
        }
        if(result.statusCode === 200){
            handleClose();
        }
        onConfirm(result);
    };

    const permisos = roles;

    const styles = {
        title: {
            backgroundColor: 'darkblue',
            color: 'white'
        }
    };

    useEffect(() => {
        const cargarDatos = async () => {
            const result = await obtenerUsuarioxId(idUsuario);
            setCorreo(result.datos[0].Correo);
            setPermiso(result.datos[0].FK_idRol);
        };
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
                                label="Usuario"
                                value={correo}
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
                        {!idUsuario && (
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
                        )}
                        <div className='input-box'>
                            <Controls.SelectInput
                                label="Permiso"
                                value={permiso}
                                onChange={setPermiso}
                                items={permisos}
                                disabled={user.idUsuario === idUsuario ? true : false}
                                keyField="idRol" 
                                valueField="Nombre" 
                            />
                        </div>
                        {permiso === 3 && (
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
                        )}
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