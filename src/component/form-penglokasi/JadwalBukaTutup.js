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

const data = [
  { hari: "Senin", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Selasa", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Rabu", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Kamis", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Jumat", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Sabtu", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Minggu", jamBuka: "08:00", jamTutup: "17:00" },
  // Add more days if needed
];
class JadwalBukaTutup extends Component {
  constructor() {
    super();
    this.state = {
      data: [...data],
      hari: "",
      jamBuka: "",
      jamTutup: "",
      isEditing: false,
      editedData: {},
    };
  }

  handleInputChange = (index, field, value) => {
    // Update the state when the input changes
    this.setState((prevState) => {
      const newData = [...prevState.data];
      newData[index][field] = value;
      return { data: newData };
    });
  };

  handleSave = () => {
    // Handle saving the updated data (you can send it to the server or perform any other action)
    console.log("Saved data:", this.state.data);
    toastr.success("Data telah diubah", "Berhasil!");
  };

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

  render() {
    return (
      <>
        <div className="col-12">
          <table className="table table-striped border-0">
            <thead>
              <tr>
                <th scope="col">Hari</th>
                <th scope="col">Jam Buka</th>
                <th scope="col">Jam Tutup</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.hari}</td>
                  <td>
                    <input
                      className="border-0"
                      type="text"
                      value={item.jamBuka}
                      onChange={(e) =>
                        this.handleInputChange(index, "jamBuka", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="border-0"
                      type="text"
                      value={item.jamTutup}
                      onChange={(e) =>
                        this.handleInputChange(
                          index,
                          "jamTutup",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-primary float-right"
            onClick={this.handleSave}
          >
            Simpan
          </button>
        </div>
      </>
    );
  }
}

export default JadwalBukaTutup;
