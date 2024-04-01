import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../../shared/toastOptions';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoginCard from '../../components/LoginCard/LoginCard';


const PaginaInicioSesion = () => {
  const notifySuccess = (mensaje) => toast.success(mensaje, toastOptions);
  const notifyWarning = (mensaje) => toast.warn(mensaje, toastOptions);
  const notifyError = (error) => toast.error(error, toastOptions);
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  useEffect(() =>{
    if(isAuthenticated) navigate('/');
  },[isAuthenticated]);

  return (
    <div>
      <Header />
      <LoginCard
        onSuccess={notifySuccess} 
        onWarning={notifyWarning} 
        onError={notifyError} 
      />
      <Footer />
      <ToastContainer/>
    </div>
  );
}

export default PaginaInicioSesion;