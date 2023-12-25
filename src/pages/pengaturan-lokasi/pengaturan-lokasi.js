import React, { Component } from "react";
// inisiasi component
import Layout from "../../component/Layout/Layout";
import FormPengaturan from "../../component/form-penglokasi/FormPengaturan";
import JadwalBukaTutup from "../../component/form-penglokasi/JadwalBukaTutup";

export default class aturlokasi extends Component {
  constructor() {
    super();
    this.state = {
      adminName: "Ferdi",
      nasabahCount: 852,
      totalSampahCount: 852,
      nasabahPerluVerifikasiCount: 852,
      transaksiSembakoCount: 29,
    };
  }

  // dummyData = [
  //   {
  //     adminName: "Pak Ferdi",
  //     nasabahCount: "18 Feb 2023",
  //     totalSampahCount: "Diagnosis and Procedure Coded",
  //     nasabahPerluVerifikasiCount: "OPA2121200001",
  //     transaksiSembakoCount: "18 Feb 2023",
  //   },
  // ];

  render() {
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
                      <li className="breadcrumb-item active">
                        Artikel & Banner
                      </li>
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
              <div class="card col-5 ">
                <h2 class="p-3 pl-5 modal-header font-weight-bold">Lokasi</h2>
                <div class="card-body">
                  <FormPengaturan />
                </div>
              </div>
              <div class="card ml-5">
                <h2 class="p-3 pl-5 modal-header font-weight-bold">
                  Jadwal Buka-Tutup
                </h2>
                <div class="card-body">
                  <JadwalBukaTutup />
                </div>
              </div>
            </section>
          </div>
        </Layout>
      </div>
    );
  }
}
