import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DaNas from "./pages/Data_Nasabah";
import VerNas from "./pages/Verifikasi_Nasabah";
import Backlist from "./pages//Data_Backlist";
import KelSembako from "./pages/Kelola_Sembako";
import RiwSembako from "./pages/Riwayat_Sembako";
import KelSampah from "./pages/Kelola_Sampah";
import RiwSampah from "./pages/Riwayat_Sampah";
import PenjualanSampah from "./pages/Data_Penjualan_Sampah";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/danas" element={<DaNas />} />
        <Route path="/vernas" element={<VerNas />} />
        <Route path="/backlist" element={<Backlist />} />
        <Route path="/kelsembako" element={<KelSembako />} />
        <Route path="/riwsembako" element={<RiwSembako />} />
        <Route path="/kelsampah" element={<KelSampah />} />
        <Route path="/riwsampah" element={<RiwSampah />} />
        <Route path="/datapenjualan" element={<PenjualanSampah />} />
      </Routes>
    </div>
  );
}

export default App;
