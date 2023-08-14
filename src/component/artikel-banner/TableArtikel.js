import React, { Component } from "react";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";

const names = [
  {
    judul: "Bank Sampah Delima, Bank Sampah Terbaik",
    tanggal_upload: "10-01-2023 13:14",
  },
];

class TableArtikel extends Component {
  constructor() {
    super();
    this.state = {
      judul: "",
      tanggal_upload: "",
      action: "",
    };
  }
  // component didmount
  componentDidMount() {
    if (!$.fn.DataTable.isDataTable("#myTable")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#tableartikel").DataTable({
            pagingType: "full_numbers",
            pageLength: 20,
            processing: true,
            dom: "Bfrtip",
            select: {
              style: "single",
            },

            buttons: [
              // {
              //   extend: "pageLength",
              //   className: "btn btn-dark bg-dark",
              // },
              // {
              //   extend: "copy",
              //   className: "btn btn-secondary bg-secondary",
              // },
              // {
              //   extend: "csv",
              //   className: "btn btn-dark bg-dark",
              // },
              // {
              //   extend: "print",
              //   customize: function (win) {
              //     $(win.document.body).css("font-size", "10pt");
              //     $(win.document.body).find("table").addClass("compact").css("font-size", "inherit");
              //   },
              //   className: "btn btn-secondary bg-secondary",
              // },
            ],

            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
              var index = iDisplayIndexFull + 1;
              $("td:first", nRow).html(index);
              return nRow;
            },

            lengthMenu: [
              [10, 20, 30, 50, -1],
              [10, 20, 30, 50, "All"],
            ],
            columnDefs: [
              {
                targets: 0,
                render: function (data, type, row, meta) {
                  return type === "export" ? meta.row + 1 : data;
                },
              },
            ],
          });
        }, 1000);
      });
    }
  }

  showTable = () => {
    try {
      return names.map((item, index) => {
        return (
          <tr>
            <td className="mt-1 mx-2">{index + 1}</td>
            <td className="mt-1 mx-2">{item.judul}</td>
            {/* <td className="text-xs font-weight-bold">{item.firstname + " " + item.lastname}</td> */}
            <td className="mt-1 mx-2">{item.tanggal_upload}</td>
            <td className="d-flex justify-content-center">
              {/* <button className="btn btn-info btn-sm mt-1 mx-2" onClick={() => this.ubahData(paket.id_paket)}> */}
              <button className="btn btn-warning btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_liat_data_nasabah">
                Edit
              </button>
              <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_tiwayat_transaksi">
                Lihat
              </button>
              {/* <button className="btn btn-danger btn-sm mt-1">Hapus</button> FOR MAKE CRUD */}
            </td>
          </tr>
        );
      });
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <>
        <div class="container-fluid">
          <div class="table-responsive p-0 pb-2">
            <table id="tableartikel" className="table align-items-center justify-content-center mb-0 table-striped">
              <thead>
                <tr>
                  <th className="text-uppercase  text-sm ">#</th>
                  <th className="text-uppercase  text-sm ">Judul</th>
                  <th className="text-uppercase  text-sm ">Tanggal Upload</th>
                  <th className="text-uppercase  text-sm ">Action</th>
                </tr>
              </thead>

              <tbody>{this.showTable()}</tbody>
            </table>
          </div>
        </div>
        {/* MODAL LIHAT DATA NASABAH SECTION */}
        <div class="modal fade" id="modal_liat_data_nasabah" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header ">
                <h5 class="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  Detail Nasabah
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body justify-content-center">
                {/* <h5 className="m-3">Profil Nasabah</h5> */}
                <div className="modal-image d-flex justify-content-center">
                  {/* <img src={logo} alt="Logo" className="brand-image " /> */}
                  {/* MAKE A LINGKARAN FOR IMAGE */}
                  <h1>INI GAMBAR</h1>
                </div>

                <form className="m-5">
                  <div class="form-group row ">
                    <label class="col-sm-5 col-form-label">ID Nasabah</label>
                    <div class="col-sm-7 ">
                      <input type="text" className="form-control mb-2" value={this.state.id_nasabah}></input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-5 col-form-label">Nama</label>
                    <div class="col-sm-7">
                      <input type="number" className="form-control mb-2" value={this.state.name_nasabah} />
                      {/* <p>10-01-2023 13:14</p> */}
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-5 col-form-label">
                      No Telepon
                    </label>
                    <div class="col-sm-7">
                      <input type="number" className="form-control mb-2" value={this.state.no_telp} />
                      {/* <p>0847-242-983-191</p> */}
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-5 col-form-label">
                      Age
                    </label>
                    <div class="col-sm-7">
                      <input type="number" class="form-control" className="form-control mb-2" value={this.state.age} />
                      {/* <p>0847-242-983-191</p> */}
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-5 col-form-label">
                      Alamat Nasabah
                    </label>
                    <div class="col-sm-7">
                      <input type="text" className="form-control mb-2" value={this.state.address_nasabah} />
                      {/* <p>Jl. Raya Bukan Gg. III No. 17a. Dinoyo, Malang</p> */}
                    </div>
                  </div>
                </form>
                {/* </div> */}
              </div>

              {/* <div class="modal-footer">
                <button type="button" class="btn btn-secondary ">
                  Tutup
                </button>
              </div> */}
            </div>
          </div>
        </div>
        {/* MODAL rIWAYAT NASABAH SECTION */}
        <div class="modal fade" id="modal_tiwayat_transaksi" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header ">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Riwayat Transaksi Nasabah
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body  justify-content-center">
                <div className="container-fluid">
                  <div className="row ">
                    <div className="left-content col-5">ewe</div>
                    <div className="right-content col-7">dfdf</div>
                  </div>
                </div>

                {/* </div> */}
              </div>

              {/* <div class="modal-footer">
                <button type="button" class="btn btn-secondary ">
                  Tutup
                </button>
              </div> */}
            </div>
          </div>
        </div>
        {/* MODAL APALAGI */}
      </>
    );
  }
}

export default TableArtikel;
