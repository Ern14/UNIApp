import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { toastOptions } from '../../shared/toastOptions';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoginCard from '../../components/LoginCard/LoginCard';


const PaginaInicioSesion = () => {
  const notifySuccess = (mensaje) => toast.success(mensaje, toastOptions);
  const notifyWarning = (mensaje) => toast.warn(mensaje, toastOptions);
  const notifyError = (error) => toast.error(error, toastOptions);

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