
import React, { useState, useEffect,Component } from "react";
import axios from "axios";

import Layout from "../../component/Layout/Layout";
import { HiUsers } from "react-icons/hi";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const DashboardPage = () => {
  const [adminName, setAdminName] = useState("Agung");
  const [nasabahCount, setNasabahCount] = useState(852);
  const [totalSampahCount, setTotalSampahCount] = useState(852);
  const [nasabahPerluVerifikasiCount, setNasabahPerluVerifikasiCount] = useState(852);
  const [transaksiSembakoCount, setTransaksiSembakoCount] = useState(29);
  const [authUser, setAuthUser] = useState(null);

  // useEffect(() => {
  //   // Gunakan useEffect untuk melakukan tindakan setelah render pertama
  //   const unsubscribe = firebaseAuthentification.onAuthStateChanged((user) => {
  //     if (user) {
  //       // user telah login
  //       setAdminName(user.displayName || "Admin"); // Ganti dengan cara yang sesuai untuk mendapatkan nama admin
  //     } else {
  //       // user belum login
  //       // Tindakan yang diperlukan jika user belum login
  //     }
  //   });

  //   // Membersihkan langganan pada componentWillUnmount
  //   return () => unsubscribe();
  // }, []); // [] berarti efek ini hanya dijalankan sekali setelah render pertama

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
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
                <div className="col-sm-9">
                  <h1 className="m-0">
                    Dashboard, Welcome
                    {/* {adminName}{" "} */}
                  </h1>
                  {authUser ? (
                    <>
                      <h5 className="text-gray"> {authUser.email}</h5>
                      <button onClick={userKeluarAkun}>Keluar akun</button>
                    </>
                  ) : (
                    <p>Keluar Akun</p>
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
                <section className="col-lg-5 connectedSortable">dsds</section>
                <section className="col-lg-7 connectedSortable">sds</section>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  );
};

export default DashboardPage;
