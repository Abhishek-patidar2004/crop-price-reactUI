import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import DropDown from "./DropDown/DropDown";



function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Dashboard" />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/DropDown" element={<DropDown />} />
     </Routes>
  );
}

export default App
