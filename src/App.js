import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard-page";
import DataNasabahPage from "./pages/data-nasabah";
import RiwayatSampahPage from "./pages/riwayat-sampah/riwayat-sampah";
import RiwayatSembakoPage from "./pages/riwayat-sembako/riwayat-sembako";
import KelolaSampahPage from "./pages/kelola-sampah/kelola-sampah";
import KelolaSembakoPage from "./pages/kelola-sembako/kelola-sembako";
import VerifikasiNasabahPage from "./pages/verifikasi-nasabah/verifikasi-nasabah";
import DataPenjualanSampahPage from "./pages/data-penjualan-sampah/data-penjualan-sampah";
import AktivitasLogin from "./pages/aktivitas-login";
import ArtikelBannerPage from "./pages/artikel-banner/artikel-banner";
import PengaturanLokasi from "./pages/pengaturan-lokasi/pengaturan-lokasi";
import DataBacklist from "./pages/data-backlist";
import LoginPage from "./pages/login";
import LupaPasswordPage from "./pages/lupa-password";
import RegisterPage from "./pages/register/register";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lupa-password" element={<LupaPasswordPage />} />
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/data-nasabah" element={<DataNasabahPage />} />
        <Route path="/riwayat-sampah" element={<RiwayatSampahPage />} />
        <Route path="/riwsembako" element={<RiwayatSembakoPage />} />
        <Route path="/kelola-sampah" element={<KelolaSampahPage />} />
        <Route path="/kelola-sembako" element={<KelolaSembakoPage />} />
        <Route path="/aturlokasi" element={<PengaturanLokasi />} />
        <Route path="/verifikasi-nasabah" element={<VerifikasiNasabahPage />} />
        <Route
          path="/data-penjualan-sampah"
          element={<DataPenjualanSampahPage />}
        />
        <Route path="/aktifitas-login" element={<AktivitasLogin />} />
        <Route path="/artikel-banner" element={<ArtikelBannerPage />} />
        <Route path="/data-backlist" element={<DataBacklist />} />
        {/* <Redirect from="/" to="/home" /> */}
      </Routes>
    </div>
  );
}

export default App;
