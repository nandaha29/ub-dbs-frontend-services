import React, { Component } from "react";
import logo from "../../../assets/logo/logo_bsd.png";

const dummyData = [
  {
    nomorHP: "082335456711",
    nama: "Andi Budiono",
    status: "Pending",
    waktu: "10-01-2023 13:14",
  },
  // ...tambahkan data dummy lain jika diperlukan
];

export default class Table_Permintaan_Verifikasi extends Component {
  constructor() {
    super();
    this.state = {
      nomorHP: "",
      nama: "",
      status: "",
      waktu: "",
      selectedData: null,
    };
  }

  handleProsesClick = (data) => {
    // Memperbarui state selectedData saat tombol "Proses" diklik
    this.setState({ selectedData: data });
  };

  handleSetujuiClick = () => {
    // Memperbarui status menjadi "Done" pada data yang diproses
    const { selectedData } = this.state;
    if (selectedData) {
      selectedData.status = "Done";
      console.log("Data setelah disetujui:", selectedData);
      // Lakukan tindakan lain sesuai kebutuhan
    }
  };

  render() {
    const { selectedData } = this.state;

    return (
      <div>
        {" "}
        <div className="card">
          <div className="card-header border-1">
            <h3 className="card-title">
              <i className="fas fa-chart-pie mr-1" />
              Table_Permintaan_Verifikasi
            </h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
              >
                <i className="fas fa-minus" />
              </button>
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="remove"
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
          <div className="card-body table-responsive p-0">
            <table className="table table-striped table-valign-middle">
              <thead>
                <tr>
                  <th>Nomor HP</th>
                  <th>Nama</th>
                  <th>Status</th>
                  <th>Waktu</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.nomorHP}</td>
                    <td>{data.nama}</td>
                    <td>
                      <button className="btn-warning border-0 disabled">
                        {data.status}
                      </button>
                    </td>
                    <td>{data.waktu}</td>
                    <td className="d-flex justify-content-center">
                      <button
                        className="btn-primary border-0"
                        data-toggle="modal"
                        data-target="#modal_minta_verif"
                        onClick={() => this.handleProsesClick(data)}
                      >
                        Proses
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* /.card */}
        {/* modal detail  */}
        <div
          class="modal fade"
          id="modal_minta_verif"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header border-0">
                <h5 class="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  Permintaan Verifikasi
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
              <div class="modal-body justify-content-center">
                <h5 className="m-3">Profil Nasabah</h5>
                <div className="modal-image d-flex justify-content-center">
                  <img src={logo} alt="Logo" className="brand-image " />
                  {/* MAKE A LINGKARAN FOR IMAGE */}
                </div>

                <form className="m-5">
                  <div className="form-group row">
                    <label
                      htmlFor="inputNama"
                      className="col-sm-5 col-form-label"
                    >
                      Nama Pengguna
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="inputNama"
                        value={selectedData?.nama || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputWaktu"
                      className="col-sm-5 col-form-label"
                    >
                      Waktu Request
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="inputWaktu"
                        value={selectedData?.waktu || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputNomorHP"
                      className="col-sm-5 col-form-label"
                    >
                      No Telepon
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="inputNomorHP"
                        value={selectedData?.nomorHP || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputAlamat"
                      className="col-sm-5 col-form-label"
                    >
                      Alamat Nasabah
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="inputAlamat"
                        value={selectedData?.alamat || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </form>
                {/* </div> */}
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dimiss="modal"
                >
                  Tolak
                </button>

                <button
                  type="button"
                  class="btn btn-success"
                  data-dimiss="modal"
                  onClick={this.handleSetujuiClick}
                >
                  Setujui
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
