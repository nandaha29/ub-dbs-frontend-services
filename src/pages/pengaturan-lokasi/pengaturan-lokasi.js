import React, { useState, useEffect } from "react";
import axios from "axios";
// inisiasi component
import Layout from "../../component/Layout/Layout";
import FormPengaturan from "../../component/form-penglokasi/FormPengaturan";
// import JadwalBukaTutup dari "../../component/form-penglokasi/JadwalBukaTutup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const AturLokasi = () => {
  const [adminName] = useState("Ferdi");
  const [nasabahCount] = useState(852);
  const [totalSampahCount] = useState(852);
  const [nasabahPerluVerifikasiCount] = useState(852);
  const [transaksiSembakoCount] = useState(29);

  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        getDataNasabah();
      } else {
        window.location = "/login";
        setAuthUser(null);
      }
    });

    // Return a cleanup function to unsubscribe from the listener
    return () => listen();
  }, []);

  const getDataNasabah = async () => {
    // Fetch data from an API or perform other actions
    try {
      const response = await axios.get("/api/nasabah", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Handle the response
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div>
      <Layout>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Pengaturan Lokasi</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/home">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Artikel & Banner</li>
                  </ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          <section className="content d-flex justify-content-center gap-4 col-11 ml-4">
            <div className="card col-5">
              <h2 className="p-3 pl-5 modal-header font-weight-bold">Lokasi</h2>
              <div className="card-body">
                <FormPengaturan />
              </div>
            </div>
            <div className="card ml-5">
              <h2 className="p-3 pl-5 modal-header font-weight-bold">Jadwal Buka-Tutup</h2>
              <div className="card-body">
                <JadwalBukaTutup />
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  );
};

export default AturLokasi;
