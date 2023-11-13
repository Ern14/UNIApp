import React from 'react';
//import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Principal/SidebarPrin';

import './PaginaPrincipal.css';

const PaginaPrincipal = () => {
    return(
        <div className='container'>
            <Sidebar />
        </div>
    );
};

export default PaginaPrincipal;
