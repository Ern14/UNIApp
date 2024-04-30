import React from 'react';
import SeccionUsuarios from './Secciones/Usuarios/SeccionUsuarios';
import { Routes, Route } from 'react-router-dom';

import './PaginaCatalogo.css';

const PaginaCatalogo = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path="usuario" element={<SeccionUsuarios />} />
            </Routes>
        </div>
    );
  };
  
  export default PaginaCatalogo;