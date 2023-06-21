import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

import CatPage from '../CatPage/CatPage';
import BitPage from '../BitPage/BitPage';
import MainPage from '../MainPage/MainPage';
import RepPage from '../RepPage/RepPage';

import './HomePage.css';

const HomePage = () => {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='inicio' element={<MainPage />} />
            <Route path='bitacora' element={<BitPage />} />
            <Route path='informe' element={<RepPage />} />
            <Route path='catalogo/*' element={<CatPage />} />
          </Routes>
        </div>
      </div>
    );
  };
  
  export default HomePage;