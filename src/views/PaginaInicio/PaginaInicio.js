import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

import PaginaCatalogo from '../PaginaCatalogo/PaginaCatalogo';
import PaginaBitacora from '../PaginaBitacora/PaginaBitacora';
import PaginaPrincipal from '../PaginaPrincipal/PaginaPrincipal';
import PaginaReporte from '../PaginaReporte/PaginaReporte';

import './PaginaInicio.css';

const PaginaInicio = () => {
    return (
      <div className='parent'> 
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='inicio' element={<PaginaPrincipal />} />
            <Route path='bitacora' element={<PaginaBitacora />} />
            <Route path='informe' element={<PaginaReporte />} />
            <Route path='catalogo/*' element={<PaginaCatalogo />} />
          </Routes>
        </div>
      </div>
    );
  };
  
  export default PaginaInicio;