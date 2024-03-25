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

const datainit = [
  {
    namaLokasi: "BankSampahA",
    linkGoogleMaps: "yoi.com",
    alamat: "disitu daerah malang deketnya ngalam",
  },
];

class FormPengaturan extends Component {
  constructor() {
    super();
    this.state = {
      data: [...datainit],
      namaLokasi: "",
      linkGoogleMaps: "",
      alamat: "",
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

  handleInputChange = (field, value) => {
    // Update the state when the input changes
    this.setState({ [field]: value });
  };

  handleSimpan = () => {
    const isConfirmed = window.confirm("Apakah anda ingin menyimpan perubahan ini?");
    if (isConfirmed) {
      const newData = {
        namaLokasi: this.state.namaLokasi,
        linkGoogleMaps: this.state.linkGoogleMaps,
        alamat: this.state.alamat,
      };

      // Update the state using a callback function to ensure the correct order of operations
      this.setState((prevState) => {
        const updatedData = [...prevState.data, newData];

        // Log the updated data to the console
        console.log("Updated Data:", updatedData);
        toastr.success("Data telah dirubah", "Berhasil!");
        // Return the updated state
        return {
          data: updatedData,
          namaLokasi: "",
          linkGoogleMaps: "",
          alamat: "",
        };
      });
    }
    // Handle saving the updated data (you can send it to the server or perform any other action)
  };

  render() {
    return (
      <>
        <div class="col-12">
          <form>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nama Lokasi</label>
                <input type="text" className="form-control" id="exampleInputEmail1" placeholder="RW 5" value={this.state.namaLokasi} onChange={(e) => this.handleInputChange("namaLokasi", e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Link Google Maps</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="isi Link Google Maps" value={this.state.linkGoogleMaps} onChange={(e) => this.handleInputChange("linkGoogleMaps", e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Alamat</label>
                <textarea class="form-control" rows="3" placeholder="Enter ..." value={this.state.alamat} onChange={(e) => this.handleInputChange("alamat", e.target.value)}></textarea>
              </div>
            </div>
            <div className="form-group">
              <button
                type="button" // Use type="button" to prevent form submission
                className="btn btn-primary float-right"
                onClick={this.handleSimpan}
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default FormPengaturan;
