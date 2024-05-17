import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const Confirmation = (props) => {

    const { estado, setEstado, onConfirm } = props;

    const handleClose = () => {
         setEstado(false);
    };

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return ( 
        <Dialog
            open={estado}
        >
            <DialogTitle>
                Confirmación
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Está seguro que quiere realizar la siguiente acción?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
                <Button onClick={handleConfirm} autoFocus>Confirmar</Button>
            </DialogActions>
        </Dialog>
     );
}
 
export default Confirmation;