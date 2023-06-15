import React from "react";
import { Routes, Route } from 'react-router-dom';
import LoginPage from './views/LoginPage/LoginPage';
import HomePage from "./views/HomePage/HomePage";
import NotFound from "./views/NotFoundPage/NotFound";

const App = () => {
  return(
    <div className="App">
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default App;