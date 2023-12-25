import React, { Component } from "react";

export default class Table_Permintaan_Penukaran extends Component {
  constructor() {
    super();
    this.state = {
      datapermintaantukar: [],
      action: "",
    };
  }
  render() {
    return (
      <div>
        {" "}
        <div className="card">
          <div className="card-header border-1">
            <h3 className="card-title">
              <i className="fas fa-chart-pie mr-1" />
              Table_Permintaan_Penukaran
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
          <div className="card-body table-responsive p-0 m-2">
            <table className="table table-striped table-valign-middle ">
              <thead>
                <tr>
                  <th>ID Order</th>
                  <th>Nama</th>
                  <th>Waktu</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>121405</td>
                  <td>Andi Budionno</td>
                  <td>10-01-2021 08:14</td>
                  <td className="d-flex justify-content-center">
                    {/* <a href="#" className="text-muted">
                      <i className="fas fa-search" />
                    </a> */}
                    <button type="button" className="btn-primary border-0 mr-2" data-toggle="modal" data-target="#modal_proses">
                      Proses
                    </button>
                    <button className="btn-danger border-0">Tolak</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* /.card */}
        {/* modal proses  */}
        <div class="modal fade" id="modal_proses" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header border-0">
                <h5 class="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  ID Penukaran XXXXXXXXX
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h5 className="m-4">Profil Penukaran</h5>
                <div className="row m-4">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Nama Pemohon</th>
                        <th scope="col">Waktu Request</th>
                        <th scope="col">ID Pemohon</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Andi Budiono</td>
                        <td>2023-01-10 08:14</td>
                        <td>100104</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="justify-content-center d-flex justify-content-between m-4">
                  <h5>Pengaturan Penukaran</h5>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Tambah Data
                  </button>
                </div>

                <div className="row m-4">
                  <table class="table ">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Jenis Sampah</th>
                        <th scope="col">Berat Barang</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <div class="input-group mb-3">
                            {/* <div class="input-group-prepend">
                              <label class="input-group-text" for="inputGroupSelect01">
                                Options
                              </label>
                            </div> */}
                            <select class="custom-select" id="inputGroupSelect01">
                              <option selected>Pilih Jenis</option>
                              <option value="1">Kertas</option>
                              <option value="1">Buku</option>
                              <option value="2">Botol Plastik</option>
                              <option value="3">Bolot Kaca</option>
                              <option value="3">Besi</option>
                            </select>
                          </div>
                        </td>
                        <td>
                          <div class="input-group mb-3">
                            <input type="number" class="form-control" aria-label="20202" />
                            <div class="input-group-append">
                              <span class="input-group-text">kg</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          {" "}
                          <button className="btn-danger border-0 mr-2">Hapus</button>
                          {/* <button className="btn-primary border-0">Edit</button> */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5>Total Poin : 304 Poin</h5>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-danger">
                  Tolak
                </button>
                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Hitung
                </button> */}
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
