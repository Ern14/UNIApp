import React from 'react';
import SeccionUsuarios from './Secciones/Usuarios/SeccionUsuarios';
import Sidebar from '../../components/Sidebar/Catálogo/SidebarCat';
import { Routes, Route } from 'react-router-dom';

import './PaginaCatalogo.css';

const PaginaCatalogo = () => {
    return (
        <div className='container'>
            <Sidebar />
            <Routes>
                <Route path="usuario" element={<SeccionUsuarios />} />
            </Routes>
        </div>
    );
  };
  
  export default PaginaCatalogo;