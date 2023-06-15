import React from 'react';
import Sidebar from '../../components/Sidebar/Catálogo/SidebarCat';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import CatPage from '../CatPage/CatPage';

import './HomePage.css';

const HomePage = () => {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='inicio' element={<Sidebar />} />
            <Route path='bitacora' element={<Sidebar />} />
            <Route path='informe' element={<Sidebar />} />
            <Route path='catalogo/*' element={<CatPage />} />
          </Routes>
        </div>
      </div>
    );
  };
  
  export default HomePage;