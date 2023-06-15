import React from "react";
import Layout from "../../components/Layout";
import Grafik_Area from "../../components/elements/Grafik_Area/Grafik_Area";
import Table_Data_Penjualan_Sampah from "../../components/elements/Elements_Data_Penjualan_Sampah/Table_Data_Penjualan_Sampah";

export default function Data_Penjualan_Sampah(props) {
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
                  <h1 className="m-0">Data_Penjualan_Sampah</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item ">
                      <a href="/home">Home</a>
                    </li>
                    <li className="breadcrumb-item active">
                      <a href="/vernas">Data Penjualan Sampah</a>
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
            <Table_Data_Penjualan_Sampah />
          </section>
        </div>
      </Layout>
    </div>
  );
}

// export default Verifikasi_Nasabah;
