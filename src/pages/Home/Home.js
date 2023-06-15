import React from "react";
// inisiasi component
import Layout from "../../components/Layout";
import Table_Permintaan_Penukaran from "../../components/elements/Elements_Home/Table_Permintaan_Penukaran/Table_Permintaan_Penukaran";
import Table_Riwayat_Penukaran from "../../components/elements/Elements_Home/Table_Riwayat_Penukaran";
import Table_Permintaan_Verifikasi from "../../components/elements/Elements_Home/Table_Permintaan_Verifikasi";
import Table_Stok_Sembako from "../../components/elements/Elements_Home/Table_Stok_Sembako/Table_Stok_Sembako";

import Box from "../../components/elements/Box/Box";
import Grafik_Area from "../../components/elements/Grafik_Area/Grafik_Area";

export default function Home() {
  return (
    <div>
      <Layout>
        {/* <h1>Welcome to HOME</h1> */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  {/* <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard v1</li>
                  </ol> */}
                  <div className="float-sm-right d-flex justify-content-center">
                    <span className="align-middle">Buka • Akan tutup pada 16.00</span>
                    <button className="btn-secondary border-0 ml-2">edit</button>
                  </div>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              {/* Small boxes (Stat box) */}
              <Box />
              {/* Main row */}
              <div className="row">
                {/* Left col */}
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
                  <Grafik_Area />
                  <Table_Permintaan_Verifikasi />
                </section>
                {/* right col */}
              </div>
              {/* /.row (main row) */}
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
      </Layout>
    </div>
  );
}
