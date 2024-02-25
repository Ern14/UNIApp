import React from 'react';
//import { Routes, Route } from 'react-router-dom';
import GraficoPastel from '../../components/Graficos/Pastel/GraficoPastel'
import GraficoBarras from '../../components/Graficos/Barras/GraficoBarras'

import './PaginaReporte.css';


const PaginaReporte = () => {
    return(
        <div className='container'>
            <div>
                <GraficoPastel />
                <GraficoBarras />
            </div>
        </div>
    );
};

export default PaginaReporte;
