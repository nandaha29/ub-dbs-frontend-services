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
    id_sembako: 10010,
    name_sembako: "Beras lalapan",
    berat_sembako: 230,
    poin_sembako: 700,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
  {
    id_sembako: 10010,
    name_sembako: "Beras Indoneasi",
    berat_sembako: 230,
    poin_sembako: 700,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
  {
    id_sembako: 10010,
    name_sembako: "Beras Padang",
    berat_sembako: 230,
    poin_sembako: 700,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
];

class TableRiwayatSampah extends Component {
  constructor() {
    super();
    this.state = {
      data_nasabah: [],
      id_sembako: "",
      name_sembako: "",
      poin_sembako: 0,
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
            <td className="mt-1 mx-2">{item.id_sembako}</td>
            {/* <td className="text-xs font-weight-bold">{item.firstname + " " + item.lastname}</td> */}
            <td className="mt-1 mx-2">{item.name_sembako}</td>
            <td className="mt-1 mx-2">{item.berat_sembako}</td>
            <td className="mt-1 mx-2">{item.poin_sembako}</td>
            <td className="mt-1 mx-2">{item.waktu_transaksi}</td>
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
            <table id="table" className="table align-items-center justify-content-center mb-0 table-striped">
              <thead>
                <tr>
                  <th className="text-uppercase  text-sm ">#</th>
                  <th className="text-uppercase  text-sm ">ID Transaksi</th>
                  <th className="text-uppercase  text-sm ">Nama Sembako</th>
                  <th className="text-uppercase  text-sm ">Berat Sembako</th>
                  <th className="text-uppercase  text-sm ">Poin</th>
                  <th className="text-uppercase  text-sm ">Waktu Transaksi</th>
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

export default TableRiwayatSampah;
