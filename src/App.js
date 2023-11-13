import React from "react";
import { Routes, Route } from 'react-router-dom';
import PaginaInicioSesion from './views/PaginaInicioSesion/PaginaInicioSesion';
import PaginaInicio from "./views/PaginaInicio/PaginaInicio";
import NotFound from "./views/NotFoundPage/NotFound";

const App = () => {
  return(
    <div className="App">
      <Routes>
        <Route path="/*" element={<PaginaInicio />} />
        <Route path="/Iniciar-Sesion" element={<PaginaInicioSesion />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default App;