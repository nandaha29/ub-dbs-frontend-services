import React, { Component } from "react";
import toastr from "toastr";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";

const data = [
  { hari: "Senin", jam: "08:00 | 17:00" },
  { hari: "Selasa", jam: "08:00 | 17:00" },
  { hari: "Rabu", jam: "08:00 | 17:00" },
  { hari: "Kamis", jam: "08:00 | 17:00" },
  { hari: "Jumat", jam: "08:00 | 17:00" },
  { hari: "Sabtu", jam: "08:00 | 17:00" },
  { hari: "Minggu", jam: "08:00 | 17:00" },
];

class JadwalBukaTutup extends Component {
  constructor() {
    super();
    this.state = {
      data: [...data],
    };
  }

  handleInputChange = (index, value) => {
    // Update the state when the input changes
    this.setState((prevState) => {
      const newData = [...prevState.data];
      newData[index].jam = value;
      return { data: newData };
    });
  };

  handleSave = () => {
    const isConfirmed = window.confirm(
      "Apakah anda yakin ingin merubah data ini?"
    );
    if (isConfirmed) {
      console.log("Saved data:", this.state.data);
      toastr.success("Data telah dirubah", "Berhasil!");
    }
  };

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
            buttons: [],
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
                <th scope="col">Jam</th>
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
                      pattern="[0-9]{2}:[0-9]{2} | [0-9]{2}:[0-9]{2}"
                      placeholder="hh:mm - hh:mm"
                      value={item.jam}
                      onChange={(e) =>
                        this.handleInputChange(index, e.target.value)
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
