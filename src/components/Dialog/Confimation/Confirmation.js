import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@mui/material";

const Confirmation = (props) => {

    const { estado, setEstado, onConfirm } = props;

    const handleClose = () => {
        setEstado(false);
    };

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    const styles = {
        title: {
            backgroundColor: 'darkblue',
            color: 'white'
        },
        typography: {
            marginTop: '20px',
            fontSize: '20px'
        }
    }

    return (
        <Dialog
            open={estado}
        >
            <DialogTitle
                sx={styles.title}
            >
                Confirmación
            </DialogTitle>
            <DialogContent>
                <Typography
                    sx={styles.typography}
                >
                    ¿Está seguro que quiere realizar la siguiente acción?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
                <Button onClick={handleConfirm} autoFocus>Confirmar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Confirmation;