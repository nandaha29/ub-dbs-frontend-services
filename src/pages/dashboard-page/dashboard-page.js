import React, { useState, useEffect, Component } from "react";
import axios from "axios";

import Layout from "../../component/Layout/Layout";
import { HiUsers } from "react-icons/hi";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import Table_Permintaan_Penukaran from "../../component/elements/Elements_Home/Table_Permintaan_Penukaran/Table_Permintaan_Penukaran";
import Table_Stok_Sembako from "../../component/elements/Elements_Home/Table_Stok_Sembako/Table_Stok_Sembako";
import Table_Riwayat_Penukaran from "../../component/elements/Elements_Home/Table_Riwayat_Penukaran/Table_Riwayat_Penukaran";
import Table_Permintaan_Verifikasi from "../../component/elements/Elements_Home/Table_Permintaan_Verifikasi/Table_Permintaan_Verifikasi";
import Grafik_Area from "../../component/share-component/grafikArea";
import Grafik_Dua from "../../component/elements/Elements_Home/Grafik_Area/Grafik_Area";

const DashboardPage = () => {
  const [nasabahCount, setNasabahCount] = useState(0);
  const [totalSampahCount, setTotalSampahCount] = useState(0);
  const [nasabahPerluVerifikasiCount, setNasabahPerluVerifikasiCount] = useState(0);
  const [transaksiSembakoCount, setTransaksiSembakoCount] = useState(0);

  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);

  const getNasabahAktif = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/user?status=1", { headers });
      setNasabahCount(response.data.data.length);
      console.log(response.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTotalSampahBulanIni = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/sampah/history-transaction", { headers });
      const totalBeratSum = response.data.reduce((sum, item) => sum + item.totalBerat, 0);
      console.log(totalBeratSum);
      setTotalSampahCount(totalBeratSum);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getNasabahPerluVerifikasi = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/user?status=0", { headers });
      setNasabahPerluVerifikasiCount(response.data.data.length);
      console.log(response.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTransaksiSembako = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/slip/penukaran", { headers });
      setTransaksiSembakoCount(response.data.data.length);
      console.log(response.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        // console.log(tes);
        // console.log("login berhasil");
        // console.log(user);
        getNasabahAktif();
        getTotalSampahBulanIni();
        getNasabahPerluVerifikasi();
        getTransaksiSembako();
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userKeluarAkun = () => {
    signOut(auth)
      .then(() => {
        console.log("udah keluar akun berhasil");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Layout>
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                {/* style={{ backgroundColor: "blue" }} */}
                <div className="col-sm-9 d-flex">
                  <h1 className="m-0">
                    Welcome, 
                    {/* {adminName}{" "} */}
                  </h1>

                  {authUser ? (
                    <>
                      <h1 className="text-gray">{` ${authUser.email}`}</h1>
                      {/* <button onClick={userKeluarAkun}>Keluar akun</button> */}
                    </>
                  ) : (
                    <p>Anda tidak Login</p>
                  )}
                </div>
                <div className="col-sm-3">
                  <div className="float-sm-right d-flex justify-content-center">
                    <span className="align-middle">Buka • Akan tutup pada 16.00</span>
                    <button className="btn-secondary border-0 ml-2">edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{nasabahCount}</h3>
                      <p>Nasabah Aktif</p>
                    </div>
                    <div className="icon">
                      <HiUsers />
                    </div>
                    <a href="#" className="small-box-footer">
                      Selengkapnya <i className="fas fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
                {/* Tambahkan bagian lainnya sesuai kebutuhan */}
                <div className="col-lg-3 col-6">
                  {/* totalsampah count */}
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{totalSampahCount} kg</h3>
                      <p>Total Sampah Bulan ini</p>
                    </div>
                    <div className="icon">
                      <HiUsers />
                    </div>
                    <a href="#" className="small-box-footer">
                      Selengkapnya <i className="fas fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  {/* nasabahPerluVerifikasi count */}
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{nasabahPerluVerifikasiCount}</h3>
                      <p>Nasabah Perlu Verifikasi</p>
                    </div>
                    <div className="icon">
                      <HiUsers />
                    </div>
                    <a href="#" className="small-box-footer">
                      Selengkapnya <i className="fas fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  {/* transaksiSembakoCount count */}
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>+{transaksiSembakoCount}%</h3>
                      <p>Transaksi Sembako</p>
                    </div>
                    <div className="icon">
                      <HiUsers />
                    </div>
                    <a href="#" className="small-box-footer">
                      Selengkapnya <i className="fas fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div className="row">
                <section className="col-lg-5 connectedSortable">
                  {/* Custom tabs (Charts with tabs)*/}
                  {/* <Modal_Proses /> */}
                  <Table_Permintaan_Penukaran />
                  <Grafik_Area />
                  <Table_Stok_Sembako />
                </section>
                {/* /.Left col */}
                {/* right col (We are only adding the ID to make the widgets sortable)*/}
                <section className="col-lg-7 connectedSortable">
                  <Table_Riwayat_Penukaran />
                  <Grafik_Dua />
                  <Table_Permintaan_Verifikasi />
                </section>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  );
};

export default DashboardPage;
