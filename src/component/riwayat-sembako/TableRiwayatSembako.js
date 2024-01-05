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
    id_nasabah: 222,
    name_nasabah: "Andi Lalapan",
    berat_nasabah: "Ditolak",
    poin_nasabah: 700,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
  {
    id_nasabah: 3333,
    name_nasabah: "Budi Recing",
    berat_nasabah: "Ditolak",
    poin_nasabah: 400,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
  {
    id_nasabah: 4444,
    name_nasabah: "Dono Marbling",
    berat_nasabah: "Berhasil Di Proses",
    poin_nasabah: 550,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
];

class TableRiwayatSembako extends Component {
  constructor() {
    super();
    this.state = {
      data_nasabah: [],
      id_nasabah: "",
      name_nasabah: "",
      berat_nasabah: "",
      poin_nasabah: 0,
      waktu_transaksi: "",
      action: "",
    };
  }
  // component didmount
  componentDidMount() {
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
      return names.map((item, index) => {
        return (
          <tr key={index}>
            {/* <td className="mt-1 mx-2">{index + 1}</td> */}
            <td className="mt-1 mx-2 text-center">{item.id_nasabah}</td>
            <td className="mt-1 mx-2 text-center">{item.name_nasabah}</td>
            <td className="text-center justify-content-center flex">
              <button
                className={`mt-1 mx-2 ${
                  item.berat_nasabah === "Berhasil Di Proses"
                    ? "btn btn-success btn-sm px-3 text-center"
                    : item.berat_nasabah === "Ditolak"
                    ? "btn btn-danger btn-sm px-5 text-center"
                    : ""
                }`}
                style={{ pointerEvents: "none" }}
              >
                {item.berat_nasabah}
              </button>
            </td>
            <td className="mt-1 mx-2 text-center">- {item.poin_nasabah}</td>
            <td className="mt-1 mx-2 text-center">{item.waktu_transaksi}</td>
            <td className="d-flex justify-content-center">
              <button className="btn btn-primary btn-sm mt-1 mx-2">
                Lihat Detail
              </button>
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
                  {/* <th className="text-uppercase  text-sm ">#</th> */}
                  <th className="text-uppercase  text-sm text-center">
                    ID Transaksi
                  </th>
                  <th className="text-uppercase  text-sm text-center">
                    Nama Nasabah
                  </th>
                  <th className="text-uppercase  text-sm text-center ">
                    Status
                  </th>
                  <th className="text-uppercase  text-sm text-center">Poin</th>
                  <th className="text-uppercase  text-sm text-center">
                    Waktu Transaksi
                  </th>
                  <th className="text-uppercase  text-sm text-center ">
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

export default TableRiwayatSembako;
