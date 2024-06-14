import React from 'react';
import SeccionUsuarios from './Secciones/Usuarios/SeccionUsuarios';
import SeccionRoles from './Secciones/Roles/SeccionRoles';
import SeccionAsignaturas from './Secciones/Asignaturas/SeccionAsignaturas';
import SeccionPeriodos from './Secciones/Periodos/SeccionPeriodos';
import SeccionGrupos from './Secciones/Grupos/SeccionGrupos';
import SeccionDepartamentos from './Secciones/Departamentos/SeccionDepartamentos';
import { Routes, Route } from 'react-router-dom';

import './PaginaCatalogo.css';

const PaginaCatalogo = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path="usuario" element={<SeccionUsuarios />} />
                <Route path="roles" element={<SeccionRoles />} />
                <Route path="asignaturas" element={<SeccionAsignaturas />} />
                <Route path="periodos" element={<SeccionPeriodos />} />
                <Route path="grupos" element={<SeccionGrupos />} />
                <Route path="departamentos" element={<SeccionDepartamentos />} />
            </Routes>
        </div>
    );
  };
  
  export default PaginaCatalogo;