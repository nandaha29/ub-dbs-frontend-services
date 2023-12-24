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
import "toastr/build/toastr.css";
import toastr from "toastr";

const names = [
  {
    waktu_mendaftar: "10/11/2004",
    name_nasabah: "Harry Bobo",
    no_telp: "08123334902",
    address_nasabah: "Perumahan A",
  },
  {
    waktu_mendaftar: "07/10/2007",
    name_nasabah: "Harry Styles",
    no_telp: "082133442920",
    address_nasabah: "Perumahan B",
  },
  {
    waktu_mendaftar: "05/07/2009",
    name_nasabah: "Harry Harra",
    no_telp: "085155280972",
    address_nasabah: "Perumahan C",
  },
];

class TableBacklist extends Component {
  constructor() {
    super();
    this.state = {
      data_nasabah: [],
      waktu_mendaftar: "",
      name_nasabah: "",
      no_telp: "",
      address_nasabah: "",
      action: "",
    };
  }

  handleDelete = (index) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (isConfirmed) {
      const updatedDataNasabah = [...this.state.data_nasabah];
      updatedDataNasabah.splice(index, 1);
      this.setState({ data_nasabah: updatedDataNasabah });
      toastr.success("Data berhasil dihapus!", "");
    }
  };

  // component didmount
  componentDidMount() {
    this.setState({ data_nasabah: names });
    if (!$.fn.DataTable.isDataTable("#myTable")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#table").DataTable({
            pagingType: "full_numbers",
            pageLength: 20,
            processing: true,
            dom: "Bfrtip",
            select: {
              style: "single",
            },

            buttons: [
              {
                extend: "pageLength",
                className: "btn btn-dark bg-dark",
              },
              // {
              //   extend: "copy",
              //   className: "btn btn-secondary bg-secondary",
              // },
              {
                extend: "csv",
                className: "btn btn-dark bg-dark",
              },
              // {
              //   extend: "print",
              //   customize: function (win) {
              //     $(win.document.body).css("font-size", "10pt");
              //     $(win.document.body).find("table").addClass("compact").css("font-size", "inherit");
              //   },
              //   className: "btn btn-secondary bg-secondary",
              // },
            ],

            fnRowCallback: function (
              nRow,
              aData,
              iDisplayIndex,
              iDisplayIndexFull
            ) {
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
      return this.state.data_nasabah.map((item, index) => {
        return (
          <tr key={index}>
            <td className="mt-1 text-center">{index + 1}</td>
            <td className="mt-1 text-center">{item.waktu_mendaftar}</td>
            <td className="mt-1 text-center">{item.name_nasabah}</td>
            <td className="mt-1 text-center">{item.no_telp}</td>
            <td className="mt-1 text-center">{item.address_nasabah}</td>
            <td className="d-flex justify-content-center">
              {/* <button className="btn btn-info btn-sm mt-1 mx-2" onClick={() => this.ubahData(paket.id_paket)}> */}
              <button
                className="btn btn-success btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_return_whitelist"
              >
                Kembalikan Ke Whitelist
              </button>
              <button
                className="btn btn-danger btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_hapus_akun"
                onClick={() => this.handleDelete(index)}
              >
                Hapus akun
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
            <table
              id="table"
              className="table align-items-center justify-content-center mb-0 table-striped"
            >
              <thead>
                <tr>
                  <th className="text-uppercase  text-sm text-center">#</th>
                  <th className="text-uppercase  text-sm text-center">
                    Waktu Mendaftar
                  </th>
                  <th className="text-uppercase  text-sm text-center">
                    Nama Nasabah
                  </th>
                  <th className="text-uppercase  text-sm text-center">
                    No. Telepon
                  </th>
                  <th className="text-uppercase  text-sm text-center">
                    Alamat
                  </th>
                  <th className="text-uppercase  text-sm text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>{this.showTable()}</tbody>
            </table>
          </div>
        </div>

        {/* MODAL APALAGI */}
      </>
    );
  }
}

export default TableBacklist;
