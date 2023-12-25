import React, { Component } from "react";

export default class Table_Riwayat_Penukaran extends Component {
  render() {
    return (
      <div>
        {" "}
        <div className="card">
          <div className="card-header border-1">
            <h3 className="card-title">
              <i className="fas fa-chart-pie mr-1" />
              Table_Riwayat_Penukaran
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
                  <th>ID Order</th>
                  <th>Nama</th>
                  <th>Status</th>
                  <th>Waktu</th>
                  <th>Petugas</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>121405</td>
                  <td>Andi Budionno</td>
                  <td>
                    {" "}
                    <button className="btn-success border-0 disabled">Selesai</button>
                  </td>
                  <td>10-01-2021 08:14</td>
                  <td>Agung</td>
                  <td className="d-flex justify-content-center">
                    {/* <a href="#" className="text-muted">
                      <i className="fas fa-search" />
                    </a> */}
                    <button className="btn-primary border-0 mr-2" data-dismiss="modal" data-toggle="modal" data-target="#modal_detail">
                      Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* /.card */}
        {/* modal detail  */}
        <div class="modal fade" id="modal_detail" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header border-0">
                <h5 class="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  ID Riwayat Penukaran XXXXXXXXX
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h5 className="m-4">Profil Penukaran</h5>
                <div className="row m-4">
                  <table class="table table-borderless">
                    <tr className="thead-light">
                      <th scope="col">Nama Nasabah</th>
                      <th scope="col">Waktu Request</th>
                      <th scope="col">Transaksi Selesai</th>
                    </tr>

                    <tr>
                      <td>Andi Budions</td>
                      <td>100104</td>
                      <td>2023-01-19 13:14</td>
                    </tr>
                    <tr className="thead-light">
                      <th scope="col">ID Nasabah</th>
                      <th scope="col">Petugas Pengurus</th>
                    </tr>

                    <tr>
                      <td>100104</td>
                      <td>Agung</td>
                    </tr>
                  </table>
                </div>

                <div className="row m-4">
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Jenis Sembako</th>
                        <th scope="col">Berat Barang</th>
                        <th scope="col">Poin</th>
                        <th scope="col">Pengurangan Poin</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Beras</td>
                        <td>1 Kg</td>
                        <td>700/0,5 kg</td>
                        <td>-1400</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Beras</td>
                        <td>1 Kg</td>
                        <td>700/0,5 kg</td>
                        <td>-1400</td>
                      </tr>
                      <tr>
                        <td colspan="4">Total</td>

                        <td>-1400</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
