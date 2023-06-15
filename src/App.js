import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DaNas from "./pages/Data_Nasabah";
import VerNas from "./pages/Verifikasi_Nasabah";
import Backlist from "./pages//Data_Backlist";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/danas" element={<DaNas />} />
        <Route path="/vernas" element={<VerNas />} />
        <Route path="/backlist" element={<Backlist />} />
      </Routes>
    </div>
  );
}

export default App;
