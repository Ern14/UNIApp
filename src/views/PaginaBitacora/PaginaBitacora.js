import React from 'react';
//import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Bitácora/SidebarBit';

import './PaginaBitacora.css';

const PaginaBitacora = () => {
    return(
        <div className='container'>
            <Sidebar />
        </div>
    );
};

export default PaginaBitacora;
