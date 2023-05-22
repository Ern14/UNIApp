import React from "react";
import { Routes, Route } from 'react-router-dom';
import LoginPage from './views/LoginPage/LoginPage';
import HomePage from "./views/HomePage/HomePage";

const App = () => {
  return(
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;