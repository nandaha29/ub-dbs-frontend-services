import React, { useState, useEffect, Component } from "react";
import axios from "axios";

import Layout from "../../component/Layout/Layout";
import { HiUsers } from "react-icons/hi";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import Table_Permintaan_Penukaran_Sampah from "../../component/elements/Elements_Home/Table_Permintaan_Penukaran_Sampah/Table_Permintaan_Penukaran_Sampah";
import Table_Permintaan_Penukaran_Sembako from "../../component/elements/Elements_Home/Table_Permintaan_Penukaran_Sembako/Table_Permintaan_Penukaran_Sembako";
import { post } from "jquery";

const DashboardPage = () => {
  const [openHour, setOpenHour] = useState();
  const [closeHour, setCloseHour] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [nasabahCount, setNasabahCount] = useState(0);
  const [totalSampahCount, setTotalSampahCount] = useState(0);
  const [nasabahPerluVerifikasiCount, setNasabahPerluVerifikasiCount] =
    useState(0);
  const [transaksiSembakoCount, setTransaksiSembakoCount] = useState(0);

  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);

  const getDataJam = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        "https://devel4-filkom.ub.ac.id/bank-sampah/lokasi-penukaran/6",
        { headers }
      );
      console.log(response.data);
      const data = response.data;
      console.log("earl", response.data.jam_buka_sekarang);

      const padZero = (value) => String(value).padStart(2, "0");
      const bukaPada = `${padZero(data.jam_buka_sekarang.hour)}:${padZero(
        data.jam_buka_sekarang.minute
      )}`;
      const tutupPada = `${padZero(data.jam_tutup_sekarang.hour)}:${padZero(
        data.jam_tutup_sekarang.minute
      )}`;

      setOpenHour(bukaPada);
      console.log("JAM BRO", openHour, tutupPada);
      setCloseHour(tutupPada);
      setIsOpen(data.status);
      console.log(isOpen);
    } catch (error) {
      console.error("Error fetching datajam:", error);
    }
  };

  const getNasabahAktif = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        "https://devel4-filkom.ub.ac.id/bank-sampah/user?status=1",
        { headers }
      );
      console.log("PPP :", response.data);
      setNasabahCount(response.data.data.length);
      console.log("nasabah aktif : ", response.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTotalSampahBulanIni = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        "https://devel4-filkom.ub.ac.id/bank-sampah/sampah/history-transaction",
        { headers }
      );
      const totalBeratSum = response.data.reduce(
        (sum, item) => sum + item.totalBerat,
        0
      );
      console.log(totalBeratSum);
      setTotalSampahCount(totalBeratSum);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getNasabahPerluVerifikasi = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        "https://devel4-filkom.ub.ac.id/bank-sampah/user?status=0&size=50",
        { headers }
      );
      setNasabahPerluVerifikasiCount(response.data.data.length);
      console.log(response.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTransaksiSembako = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const currentMonth = new Date().getMonth() + 1;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    let totalSuccessfulTransactions = 0;
    try {
      const response = await axios.get(
        `https://devel4-filkom.ub.ac.id/slip/penukaran?filterMonth=${currentMonth}`,
        { headers }
      );
      const response2 = await axios.get(
        `https://devel4-filkom.ub.ac.id/slip/penukaran?filterMonth=${previousMonth}`,
        { headers }
      );
      console.log("BULAN INI : ", response.data.data.length);
      console.log("BULAN LALU : ", response2.data.data.length);
      const successfulTransactions1 = response.data.data.filter(
        (transaction) => transaction.status === "BERHASIL"
      );
      const successfulTransactions2 = response2.data.data.filter(
        (transaction) => transaction.status === "BERHASIL"
      );

      if (successfulTransactions2.length === 0) {
        totalSuccessfulTransactions = 0;
      } else {
        totalSuccessfulTransactions =
          ((successfulTransactions1.length - successfulTransactions2.length) /
            successfulTransactions2.length) *
          100;
      }
      console.log("OUTPUT : ", totalSuccessfulTransactions);
      const formattedPercentage = totalSuccessfulTransactions.toFixed(1);
      setTransaksiSembakoCount(formattedPercentage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const countSuccessfulTransactions = (data) => {
    return data.reduce((count, transaction) => {
      if (transaction.status === "BERHASIL") {
        return count + 1;
      }
      return count;
    }, 0);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        // console.log(tes);
        // console.log("login berhasil");
        // console.log(user);
        getDataJam();
        getNasabahAktif();
        getTotalSampahBulanIni();
        getNasabahPerluVerifikasi();
        getTransaksiSembako();
      } else {
        setAuthUser(null);
        window.location = "/login";
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

  const handleInputChange = (e, setValue) => {
    const value = e.target.value.replace(/\D/, "").slice(0, 4);
    if (value.length <= 2) {
      setValue(value);
    } else {
      setValue(`${value.slice(0, 2)}:${value.slice(2)}`); // formatting
    }
  };

  const toggleSwitch = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSave = async () => {
    const newData = {
      buka: openHour,
      tutup: closeHour,
      status: isOpen,
    };
    const regex = /^\d{2}:\d{2}$/;
    if (!regex.test(openHour) || !regex.test(closeHour)) {
      alert("Format jam tidak sesuai. Format yang diharapkan adalah HH:MM");
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    console.log("TES");
    console.log(openHour);
    console.log(closeHour);
    console.log(isOpen);
    try {
      const response = await axios.put(
        "https://devel4-filkom.ub.ac.id/bank-sampah/lokasi-penukaran/status?id=6",
        newData,
        { headers }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting status data:", error);
    }
  };

  return (
    <div>
      <Layout>
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-9 d-flex">
                  <h1 className="m-0">Welcome, </h1>

                  {authUser ? (
                    <>
                      <h1 className="text-gray">{`  ${authUser.email}`}</h1>
                      {/* <button onClick={userKeluarAkun}>Keluar akun</button> */}
                    </>
                  ) : (
                    <h1 className="text-gray">Anda belum login</h1>
                  )}
                </div>
                <div className="col-sm-3">
                  <div className="float-sm-right d-flex justify-content-center">
                    <span className="align-middle">
                      {isOpen ? "Buka" : "Tutup"} • Akan tutup pada{" "}
                      <a className="text-md badge bg-secondary"> {closeHour}</a>
                    </span>
                    <button
                      className="btn-primary border-0 ml-2"
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#modal_edit_waktu"
                    >
                      edit
                    </button>
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
                    {/* <a href="#" className="small-box-footer">
                      Selengkapnya <i className="fas fa-arrow-circle-right" />
                    </a> */}
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
                    {/* <a href="#" className="small-box-footer">
                      Selengkapnya <i className="fas fa-arrow-circle-right" />
                    </a> */}
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
                    {/* <a href="#" className="small-box-footer">
                      Selengkapnya <i className="fas fa-arrow-circle-right" />
                    </a> */}
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
                    {/* <a href="#" className="small-box-footer">
                      Selengkapnya <i className="fas fa-arrow-circle-right" />
                    </a> */}
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div className="row">
                <section className="col-lg-6 connectedSortable">
                  {/* Custom tabs (Charts with tabs)*/}
                  <Table_Permintaan_Penukaran_Sampah />
                </section>
                {/* /.Left col */}
                <section className="col-lg-6 connectedSortable">
                  <Table_Permintaan_Penukaran_Sembako />
                </section>
              </div>
            </div>
          </section>
        </div>
        {/* MODAL EDIT SECTION */}
        <div
          class="modal fade"
          data-dismiss="modal"
          id="modal_edit_waktu"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header ">
                <h5 class="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  Buka / Tutup Balai
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body justify-content-center">
                <form className="m-5">
                  <div className="form-group row">
                    <label className="col-sm-5">Buka Pada : </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control text-sm font-weight-bold"
                        value={openHour}
                        // Ketika nilai input berubah, perbarui state openHour
                        onChange={(e) => setOpenHour(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5">Tutup Pada : </label>
                    <div className="col-sm-7">
                      {/* Inisialisasi nilai input dengan closeHour */}
                      <input
                        type="text"
                        className="form-control text-sm font-weight-bold"
                        value={closeHour}
                        // Ketika nilai input berubah, perbarui state closeHour
                        onChange={(e) => setCloseHour(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5">Status saat ini : </label>
                    <div className="col-sm-7">
                      <button
                        type="button"
                        className={`btn ${
                          isOpen ? "btn-success" : "btn-secondary"
                        }`}
                        onClick={toggleSwitch}
                      >
                        {isOpen ? "Buka" : "Tutup"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary float-sm-left"
                  type="button"
                  data-dismiss="modal"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={handleSave}
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default DashboardPage;
