import React, { Component } from "react";
// inisiasi component
import Layout from "../../component/Layout/Layout";
import TableRiwayatSampah from "../../component/riwayat-sampah/TableRiwayatSampah";

import { HiUsers } from "react-icons/hi";
import GrafikArea from "../../component/share-component/grafikArea";

export default class RiwayatSampahPage extends Component {
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
                    <h1 className="m-0">Riwayat Sampah</h1>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item ">
                        <a href="/home">Home</a>
                      </li>
                      <li className="breadcrumb-item ">
                        <a href="/kelola-sampah">Data Sampah</a>
                      </li>
                      <li className="breadcrumb-item active">
                        <a href="/riwayat-sampah">Riwayat Sampah</a>
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
              <TableRiwayatSampah />
            </section>
          </div>
        </Layout>
      </div>
    );
  }
}
