import React from 'react';
import SeccionUsuarios from './Secciones/Usuarios/SeccionUsuarios';
import SeccionRoles from './Secciones/Roles/SeccionRoles';
import SeccionAsignaturas from './Secciones/Asignaturas/SeccionAsignaturas';
import { Routes, Route } from 'react-router-dom';

import './PaginaCatalogo.css';

const PaginaCatalogo = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path="usuario" element={<SeccionUsuarios />} />
                <Route path="roles" element={<SeccionRoles />} />
                <Route path="asignaturas" element={<SeccionAsignaturas />} />
            </Routes>
        </div>
    );
  };
  
  export default PaginaCatalogo;