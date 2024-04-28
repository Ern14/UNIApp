import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DrawerMenu from '../../components/Drawer/DrawerMenu';

import PaginaCatalogo from '../PaginaCatalogo/PaginaCatalogo';
import PaginaBitacora from '../PaginaBitacora/PaginaBitacora';
import PaginaPrincipal from '../PaginaPrincipal/PaginaPrincipal';
import PaginaReporte from '../PaginaReporte/PaginaReporte';

import './PaginaInicio.css';

const PaginaInicio = () => {
  return (
    <div className='body'>
      <DrawerMenu />
      <Routes>
        <Route path='inicio' element={<PaginaPrincipal />} />
        <Route path='bitacora' element={<PaginaBitacora />} />
        <Route path='informe' element={<PaginaReporte />} />
        <Route path='catalogo/*' element={<PaginaCatalogo />} />
      </Routes>
    </div>
  );
};

export default PaginaInicio;