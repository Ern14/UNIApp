import React from 'react';
import SecUsuario from './Sections/Usuarios/SecUsuarios';
import Sidebar from '../../components/Sidebar/Catálogo/SidebarCat';
import { Routes, Route } from 'react-router-dom';

import './CatPage.css';

const CatPage = () => {
    return (
        <div className='container'>
            <Sidebar />
            <Routes>
                <Route path="usuario" element={<SecUsuario />} />
            </Routes>
        </div>
    );
  };
  
  export default CatPage;