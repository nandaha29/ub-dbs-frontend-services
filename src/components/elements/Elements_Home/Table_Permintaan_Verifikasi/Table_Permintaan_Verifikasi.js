import React, { Component } from "react";
import logo from "../../../assets/logo/logo_bsd.png";

export default class Table_Permintaan_Verifikasi extends Component {
  render() {
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
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus" />
              </button>
              <button type="button" className="btn btn-tool" data-card-widget="remove">
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
                <tr>
                  <td>082335456711</td>
                  <td>Andi Budiono</td>
                  <td>
                    <button className="btn-warning border-0 disabled">Pending</button>
                  </td>
                  <td>10-01-2023 13:14</td>
                  <td className="d-flex justify-content-center">
                    {/* <a href="#" className="text-muted">
                      <i className="fas fa-search" />
                    </a> */}
                    <button className="btn-primary border-0" data-dismiss="modal" data-toggle="modal" data-target="#modal_minta_verif">
                      Proses
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* /.card */}
        {/* modal detail  */}
        <div class="modal fade" id="modal_minta_verif" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header border-0">
                <h5 class="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  Permintaan Verifikasi
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                  <div class="form-group row ">
                    <label for="inputPassword" class="col-sm-5 col-form-label">
                      Nama Pengguna
                    </label>
                    <div class="col-sm-7 ">
                      <input type="text" class="form-control" id="inputPassword" />
                      {/* <p>Andi Budiono</p> */}
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-5 col-form-label">
                      Waktu Request
                    </label>
                    <div class="col-sm-7">
                      <input type="number" class="form-control" id="inputPassword" />
                      {/* <p>10-01-2023 13:14</p> */}
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-5 col-form-label">
                      No Telepon
                    </label>
                    <div class="col-sm-7">
                      <input type="number" class="form-control" id="inputPassword" />
                      {/* <p>0847-242-983-191</p> */}
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-5 col-form-label">
                      Alamat Nasabah
                    </label>
                    <div class="col-sm-7">
                      <input type="text" class="form-control" id="inputPassword" />
                      {/* <p>Jl. Raya Bukan Gg. III No. 17a. Dinoyo, Malang</p> */}
                    </div>
                  </div>
                </form>
                {/* </div> */}
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-danger ">
                  Tolak
                </button>

                <button type="button" class="btn btn-success">
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
