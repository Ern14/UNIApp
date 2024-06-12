import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { Snackbar, Alert } from '@mui/material';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoginCard from '../../components/LoginCard/LoginCard';
import './PaginaInicioSesion';


const PaginaInicioSesion = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSnackbarOpen = (result) => {
    if (result.statusCode === 200){
      setSnackbar({ open: true, message: result.datos.mensaje, severity: "success" });
    }else{
      setSnackbar({ open: true, message: result.datos.mensaje, severity: "warning" });
    }
  }

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  }

  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  useEffect(() =>{
    if(isAuthenticated){
      navigate('/inicio')
    };
  },[isAuthenticated, navigate]);

  return (
    <div className='login-container'>
      <Header />
      <LoginCard isAuthenticated={isAuthenticated}
        onConfirm={handleSnackbarOpen} 
      />
      <Footer />
      <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                >
                <Alert
                    severity={snackbar.severity}
                    variant='filled'
                    >     
                        {snackbar.message}
                </Alert>
      </Snackbar>
    </div>
  );
}

export default PaginaInicioSesion;