import React, { Component } from "react";
// inisiasi component
import Layout from "../../component/Layout/Layout";
// import TableRiwayatSampah from "../../component/riwayat-sampah/TableRiwayatSampah";

import logo from "../../component/assets/logo/Logo.png";

export default class LupaPasswordPage extends Component {
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
      <div className="d-lg-flex half">
        <div class="col p-5" style={{ backgroundColor: "#F1FFF5", height: "100%" }}>
          <div class="col">
            <img src="dist/img/Tablet login-bro 1.png" alt="User Image" />
          </div>
        </div>
        <div class="col ">
          <div class="container">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7">
                <div className="atas text-center p-3" style={{ marginTop: 70 }}>
                  <img src={logo} alt="Logo" className="brand-image " height={50} />
                  <h3>Bank Sampah Delima</h3>
                </div>
                <div className="bawah p-3" style={{ marginTop: 20 }}>
                  <h3 className="text-center">Lupa Password</h3>
                  <p class="mb-5 text-gray text-center">Masukkan email yang terdaftar pada akun anda, kami akan mengirimkan kode verifikasi pada email tersebut</p>
                  <form action="#" method="post">
                    <div class="form-group first">
                      <label for="username">Email</label>
                      <input type="text" class="form-control" placeholder="your-email@gmail.com" id="Email" />
                    </div>
                    <input type="submit" value="Kirim Kode Verifikasi" class="btn btn-block btn-success mt-5" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
