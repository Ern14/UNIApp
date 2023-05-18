import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from '../src/views/LoginPage/Login';
import Datagrid from "./views/DatagridPage/Datagrid";

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Datagrid" element={<Datagrid />} />
      </Routes>
    </>
  );
};

export default App;