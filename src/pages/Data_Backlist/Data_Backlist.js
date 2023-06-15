import React from "react";
import Layout from "../../components/Layout";
import Table_Backlist from "../../components/elements/Elements_VerNas/Table_Backlist";

export default function Data_Backlist(props) {
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
                  <h1 className="m-0">Daftar_BackList</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item ">
                      <a href="/home">Home</a>
                    </li>
                    <li className="breadcrumb-item ">
                      <a href="/vernas">Verifikasi Nasabah</a>
                    </li>
                    <li className="breadcrumb-item active">
                      <a href="/backlist">Data Backlist</a>
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
          <section className="content">
            <Table_Backlist />
            {/* <Table_Try /> */}
          </section>
        </div>
      </Layout>
    </div>
  );
}

// export default Verifikasi_Nasabah;
