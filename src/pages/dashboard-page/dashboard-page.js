import React, { Component } from "react";
import axios from "axios";
// inisiasi component
import Layout from "../../component/Layout/Layout";
// import Table_Permintaan_Penukaran from "../../components/elements/Elements_Home/Table_Permintaan_Penukaran/Table_Permintaan_Penukaran";
// import Table_Riwayat_Penukaran from "../../components/elements/Elements_Home/Table_Riwayat_Penukaran";
// import Table_Permintaan_Verifikasi from "../../components/elements/Elements_Home/Table_Permintaan_Verifikasi";
// import Table_Stok_Sembako from "../../components/elements/Elements_Home/Table_Stok_Sembako/Table_Stok_Sembako";

// import Box from "../../component/dashboard-page/Box";
// import InfoBox from "../../component/share-component/infoBox";
// import Grafik_Area from "../../components/elements/Grafik_Area/Grafik_Area";

import { HiUsers } from "react-icons/hi";

export default class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      adminName: "Agung",
      nasabahCount: 852,
      totalSampahCount: 852,
      nasabahPerluVerifikasiCount: 852,
      transaksiSembakoCount: 29,
    };
  }

  getVerifUser = () => {
    const url = "https://devel4-filkom.ub.ac.id/bank-sampah/user?status=1"
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer AOkPPWQoceQ4kbUwpekWnaQnmeh5cdSB5uX1QV1OFTBA9jAXr2ckpenFySVMDyOPSRfMCIJw4UQUvvNyA89gt0cpvjqTsqRPWE9Z8E4fOFgRWUTxmAZ6XjriyMPoIapmiTN6Eq_WNm9auGrDk0qOfb6v6Px5FmCInLrXQN3Yi4WbIOxmxCmK7_H5GZpBRmiQzKZgg3VERhUTOkbiA2gdJ1U0tcfY1_9Xh1RsdkSLvbj5cyrGaEEK6-eiJLJAwqL6ifJIKtITow8nmYJ75wh06DFhYElwlealrA'
    }
    axios.get(url, { headers })
      .then(response => {
        this.setState({ nasabahCount: response.data.data.length })
        console.log(response.data.data.length)
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            // this.props.history.push("/dashboard")
          }
        } else {
          console.log(error);
        }
      })
  }
  getUnverifUser = () => {
    const url = "https://devel4-filkom.ub.ac.id/bank-sampah/user?status=0"
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer AOkPPWQoceQ4kbUwpekWnaQnmeh5cdSB5uX1QV1OFTBA9jAXr2ckpenFySVMDyOPSRfMCIJw4UQUvvNyA89gt0cpvjqTsqRPWE9Z8E4fOFgRWUTxmAZ6XjriyMPoIapmiTN6Eq_WNm9auGrDk0qOfb6v6Px5FmCInLrXQN3Yi4WbIOxmxCmK7_H5GZpBRmiQzKZgg3VERhUTOkbiA2gdJ1U0tcfY1_9Xh1RsdkSLvbj5cyrGaEEK6-eiJLJAwqL6ifJIKtITow8nmYJ75wh06DFhYElwlealrA'
    }
    axios.get(url, { headers })
      .then(response => {
        this.setState({ nasabahPerluVerifikasiCount: response.data.data.length })
        console.log(response.data.data.length)
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            // this.props.history.push("/dashboard")
          }
        } else {
          console.log(error);
        }
      })
  }
  getTotSam = () => {
    const url = "https://devel4-filkom.ub.ac.id/slip/menabung?status=berhasil&filterMonth=6"
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer AOkPPWQoceQ4kbUwpekWnaQnmeh5cdSB5uX1QV1OFTBA9jAXr2ckpenFySVMDyOPSRfMCIJw4UQUvvNyA89gt0cpvjqTsqRPWE9Z8E4fOFgRWUTxmAZ6XjriyMPoIapmiTN6Eq_WNm9auGrDk0qOfb6v6Px5FmCInLrXQN3Yi4WbIOxmxCmK7_H5GZpBRmiQzKZgg3VERhUTOkbiA2gdJ1U0tcfY1_9Xh1RsdkSLvbj5cyrGaEEK6-eiJLJAwqL6ifJIKtITow8nmYJ75wh06DFhYElwlealrA'
    }
    axios.get(url, { headers })
      .then(response => {
        this.setState({ totalSampahCount: response.data.data.length })
        console.log(response.data.data.length)
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            // this.props.history.push("/dashboard")
          }
        } else {
          console.log(error);
        }
      })
  }
  getTrans = () => {
    const url = "https://devel4-filkom.ub.ac.id/slip/penukaran?filterMonth=6&status=berhasil&page=1"
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer AOkPPWQoceQ4kbUwpekWnaQnmeh5cdSB5uX1QV1OFTBA9jAXr2ckpenFySVMDyOPSRfMCIJw4UQUvvNyA89gt0cpvjqTsqRPWE9Z8E4fOFgRWUTxmAZ6XjriyMPoIapmiTN6Eq_WNm9auGrDk0qOfb6v6Px5FmCInLrXQN3Yi4WbIOxmxCmK7_H5GZpBRmiQzKZgg3VERhUTOkbiA2gdJ1U0tcfY1_9Xh1RsdkSLvbj5cyrGaEEK6-eiJLJAwqL6ifJIKtITow8nmYJ75wh06DFhYElwlealrA'
    }
    axios.get(url, {headers})
      .then(response => {
        this.setState({ transaksiSembakoCount: response.data.data.length })
        console.log(response.data.data.length)
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            // this.props.history.push("/dashboard")
          }
        } else {
          console.log(error);
        }
      })
  }
  componentDidMount() {
    this.getVerifUser()
    this.getUnverifUser()
    this.getTotSam()
    this.getTrans()
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
                    <h1 className="m-0">Dashboard, Welcome {this.state.adminName}</h1>
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
                <div className="row">
                  <div className="col-lg-3 col-6">
                    {/* nasabah count */}
                    <div className="small-box bg-info">
                      <div className="inner">
                        <h3>{this.state.nasabahCount}</h3>
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
                  <div className="col-lg-3 col-6">
                    {/* totalsampah count */}
                    <div className="small-box bg-warning">
                      <div className="inner">
                        <h3>{this.state.totalSampahCount} kg</h3>
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
                        <h3>{this.state.nasabahPerluVerifikasiCount}</h3>
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
                        <h3>+{this.state.transaksiSembakoCount}%</h3>
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
                </div>

                <div className="row">
                  {/* Left col */}
                  <section className="col-lg-5 connectedSortable">
                    {/* Custom tabs (Charts with tabs)*/}
                    {/* <Modal_Proses /> */}
                    {/* <Table_Permintaan_Penukaran /> */}
                    {/* <Grafik_Area /> */}
                    {/* <Table_Stok_Sembako /> */}
                    dsds
                  </section>

                  {/* /.Left col */}
                  {/* right col (We are only adding the ID to make the widgets sortable)*/}
                  <section className="col-lg-7 connectedSortable">
                    {/* <Table_Riwayat_Penukaran /> */}
                    {/* <Grafik_Area /> */}
                    {/* <Table_Permintaan_Verifikasi /> */}
                    sds
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
}
