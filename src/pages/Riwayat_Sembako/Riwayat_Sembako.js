import React from "react";
import Layout from "../../components/Layout";
import Table_VerNas from "../../components/elements/Elements_VerNas/Table_VerNas";
import Table_Riwayat_Sembako from "../../components/elements/Elements_Riwayat_Sembako/Table_Riwayat_Sembako/Table_Riwayat_Sembako";
import Grafik_Area from "../../components/elements/Grafik_Area/Grafik_Area";

export default function Riwayat_Sembako(props) {
  // function Verifikasi_Nasabah(props) {
  return (
    <div>
      <Layout>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Riwayat_Sembako</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item ">
                      <a href="/home">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      <a href="/vernas">Data Sembako</a>
                    </li>
                    <li className="breadcrumb-item active">
                      <a href="/vernas">Riwayat Sembako</a>
                    </li>
                  </ol>
                  {/* <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_return_whitelist">
                    + Tambah Sembako
                  </button> */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          <section className="content">
            <div className="row">
              {/* Left col */}
              <section className="col-lg-5 connectedSortable">
                <Grafik_Area />
              </section>

              {/* /.Left col */}
              <section className="col-lg-7 connectedSortable">
                <Grafik_Area />
              </section>
              {/* right col */}
            </div>
            <Table_Riwayat_Sembako />
          </section>
        </div>
      </Layout>
    </div>
  );
}

// export default Verifikasi_Nasabah;
