import React from "react";
import { Routes, Route } from 'react-router-dom';
import PaginaInicioSesion from './views/PaginaInicioSesion/PaginaInicioSesion';
import PaginaInicio from "./views/PaginaInicio/PaginaInicio";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./views/NotFoundPage/NotFound";

const App = () => {
  return(
    <div className="App">
      <Routes>
        <Route path="/Iniciar-Sesion" element={<PaginaInicioSesion />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<PaginaInicio />} />      
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;