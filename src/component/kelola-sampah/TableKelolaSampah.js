import React, { Component } from "react";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $, { noConflict } from "jquery";

const names = [
  {
    id_sembako: 10010,
    foto_sembako: "foto_saya.jpg",
    name_sembako: "Beras lalapan",
    poin_sembako: 230,
    stok_sembako: 5,
    status: "Aktif",
  },
  {
    id_sembako: 10010,
    foto_sembako: "foto_saya.jpg",
    name_sembako: "Beras Sidoarjo",
    poin_sembako: 230,
    stok_sembako: 5,
    status: "Diarsipkan",
  },
  {
    id_sembako: 10010,
    foto_sembako: "foto_saya.jpg",
    name_sembako: "Beras Padang",
    poin_sembako: 230,
    stok_sembako: 5,
    status: "Aktif",
  },
];

class TableKelolaSampah extends Component {
  constructor() {
    super();
    this.state = {
      data_nasabah: [],
      id_sembako: "",
      foto_sembako: "",
      name_sembako: "",
      poin_sembako: 0,
      stok_sembako: 0,
      status: 0,
      action: "",
      editingItemIndex: -1,
      editingItem: {},
      isModalOpen: false,
    };
  }
  //edit
  editItem = (index) => {
    const editingItem = names[index];
    this.setState({
      editingItemIndex: index,
      editingItem: { ...editingItem },
      isModalOpen: true,
    });
  };

  //Status
  toggleStatus = (index) => {
    const newData = [...this.state.data_nasabah];
    const newStatus =
      newData[index].status === "Aktif" ? "Diarsipkan" : "Aktif";
    newData[index].status = newStatus;
    this.setState({ data_nasabah: newData });
  };

  //close modal
  closeModal = () => {
    this.setState({
      editingItemIndex: -1,
      editingItem: {},
      isModalOpen: false, // Set modal visibility to false
    });
  };

  //Image View
  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          selectedImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  //save
  saveChanges = () => {
    const { editingItemIndex, editingItem, data_nasabah } = this.state;
    const newData = data_nasabah.slice(); // Membuat salinan array data_nasabah
    newData[editingItemIndex] = { ...editingItem }; // Mengganti data item yang diedit dengan data yang baru

    this.setState({
      data_nasabah: newData,
      editingItemIndex: -1,
      editingItem: {},
    });

    // Menutup modal secara manual
    $("#modal_return_whitelist").modal("hide");
    this.closeModal();
  };

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
      return names.map((item, index) => {
        const { selectedImage } = this.state;
        return (
          <tr key={index}>
            <td className="mt-1 mx-2">{index + 1}</td>
            <td className="mt-1 mx-2">{item.id_sembako}</td>
            {/* <td className="text-xs font-weight-bold">{item.firstname + " " + item.lastname}</td> */}
            <td className="mt-1 mx-2">{item.foto_sembako}</td>
            <td className="mt-1 mx-2">{item.name_sembako}</td>
            <td className="mt-1 mx-2">{item.poin_sembako}</td>
            <td className="mt-1 mx-2">{item.stok_sembako}</td>
            <td>
              <button
                className={`mt-1 mx-2 text-center ${
                  item.status === "Aktif"
                    ? "btn btn-success btn-sm pl-5 pr-5 text-center"
                    : item.status === "Diarsipkan"
                    ? "btn btn-secondary btn-sm pl-4 pr-4 text-center"
                    : ""
                }`}
                style={{ pointerEvents: "none" }}
              >
                {item.status}
              </button>
            </td>
            <td className="d-flex justify-content-center">
              {/* <button className="btn btn-info btn-sm mt-1 mx-2" onClick={() => this.ubahData(paket.id_paket)}> */}
              <button
                className="btn btn-primary btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_return_whitelist"
                onClick={() => this.editItem(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-warning btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_hapus_akun"
                onClick={() => this.toggleStatus(index)}
              >
                {item.status === "Aktif" ? "Arsipkan" : "Aktifkan"}
              </button>
              <button
                className="btn btn-danger btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_hapus_akun"
              >
                Hapus
              </button>
              {/* <button className="btn btn-danger btn-sm mt-1">Hapus</button> FOR MAKE CRUD */}

              <div
                className={`modal fade ${this.state.isModalOpen ? "show" : ""}`}
                id="modal_return_whitelist"
                data-backdrop="static"
                data-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                onShow={this.openTambahItemModal}
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Tambah Sembako
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row px-5 text-md">
                          <div className="col-md-4">
                            <div className="form-group"></div>
                          </div>
                          <div className="col-md-8 pb-4">
                            <div className="">
                              <div className="">
                                {selectedImage && (
                                  <img
                                    src={selectedImage}
                                    alt="Preview"
                                    style={{ width: "50%" }}
                                  />
                                )}
                              </div>
                              <input
                                type="file"
                                accept=".png"
                                onChange={this.handleImageUpload}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row px-5 text-md">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="text-sm">ID Sembako:</label>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="form-group">
                              <div
                                type="text"
                                className="form-control text-sm font-weight-bold"
                              >
                                {this.state.editingItem.id_sembako}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row px-5 text-md">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="text-sm">Nama Sembako:</label>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control text-sm font-weight-bold"
                                value={this.state.editingItem.name_sembako}
                                onChange={(e) =>
                                  this.setState({
                                    editingItem: {
                                      ...this.state.editingItem,
                                      name_sembako: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row px-5 text-md">
                          <div className="col-md-4">
                            <div className="form-group ">
                              <label className="text-sm">
                                Harga per poin 0.5 kg (poin):
                              </label>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="form-group">
                              <input
                                type="number"
                                className="form-control text-sm font-weight-bold "
                                value={this.state.editingItem.poin_sembako}
                                onChange={(e) =>
                                  this.setState({
                                    editingItem: {
                                      ...this.state.editingItem,
                                      poin_sembako: parseInt(e.target.value),
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row px-5 text-md">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="text-sm">Stok (kg):</label>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="form-group">
                              <input
                                type="number"
                                className="form-control text-sm font-weight-bold"
                                value={this.state.editingItem.stok_sembako}
                                onChange={(e) =>
                                  this.setState({
                                    editingItem: {
                                      ...this.state.editingItem,
                                      stok_sembako: parseInt(e.target.value),
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={this.closeModal}
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.saveChanges}
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
                  <th className="text-uppercase  text-sm text-center pl-4">
                    #
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    ID Sampah
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Foto
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Nama Sampah
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Poin per 0,5 kg
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Stok
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Status
                  </th>
                  <th className="text-uppercase  text-sm text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-center">{this.showTable()}</tbody>
            </table>
          </div>
        </div>

        {/* MODAL APALAGI */}
      </>
    );
  }
}

export default TableKelolaSampah;
