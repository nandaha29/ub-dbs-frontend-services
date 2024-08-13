import React, { Component } from "react";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
// import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";

const names = [
  {
    judul: "Rayakan Kemeriahan Liburan Dengan Buang Sampah",
    tanggal_upload: "10-01-2023 13:14",
    foto_banner: "Beras ABC.jpg",
  },
];

class TableBanner extends Component {
  constructor() {
    super();
    this.state = {
      data_banner: [],
      judul: "",
      tanggal_upload: "",
      action: "",
      foto_banner: "",
      editingItemIndex: -1,
      editingItem: {},
      isModalOpen: false,
      selectedImage: null,
    };
  }

  editItem = (index) => {
    const editingItem = { ...this.state.data_banner[index] };
    this.setState({
      editingItemIndex: index,
      editingItem,
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  // Image update Handler
  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState((prevState) => ({
          editingItem: {
            ...prevState.editingItem,
            foto_banner: reader.result.split(",")[1],
          },
          selectedImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      this.setState((prevState) => ({
        editingItem: {
          ...prevState.editingItem,
          foto_banner: reader.result,
        },
      }));
    }
  };

  //Handle Image Tambah
  handleImageUploadADD = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          selectedImage: reader.result,
          foto_banner: reader.result.split(",")[1],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Tambah Banner
  saveNewData = () => {
    const { data_banner, judul, foto_banner } = this.state;
    const newData = {
      judul: judul,
      tanggal_upload: new Date().toLocaleString(),
      foto_banner: foto_banner,
    };
    this.setState(
      {
        data_banner: [...data_banner, newData],
        judul: "",
        foto_banner: "",
        selectedImage: null,
        isModalOpen: false,
      },
      () => {
        console.log("Data setelah disimpan:", this.state.data_banner);
      }
    );
  };

  // Save changes
  saveChanges = () => {
    const { editingItemIndex, editingItem, data_banner } = this.state;

    // Buat salinan array data_banner
    const newData = [...data_banner];

    // Perbarui item yang diedit dengan data yang baru
    newData[editingItemIndex] = { ...editingItem };

    // Perbarui state dengan data yang baru dan tutup modal
    this.setState(
      {
        data_banner: newData,
        editingItemIndex: -1,
        editingItem: {},
        isModalOpen: false,
        selectedImage: null,
      },
      () => {
        console.log("Data setelah disimpan:", this.state.data_banner);
      }
    );
  };

  // component didmount
  componentDidMount() {
    this.setState({ data_banner: names });
    if (!$.fn.DataTable.isDataTable("#myTable")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#tablebanner").DataTable({
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
      return this.state.data_banner.map((item, index) => {
        return (
          <tr>
            <td className="mt-1 mx-2">{index + 1}</td>
            <td className="mt-1 mx-2">{item.judul}</td>
            {/* <td className="text-xs font-weight-bold">{item.firstname + " " + item.lastname}</td> */}
            <td className="mt-1 mx-2">{item.tanggal_upload}</td>
            <td className="d-flex justify-content-center">
              {/* <button className="btn btn-info btn-sm mt-1 mx-2" onClick={() => this.ubahData(paket.id_paket)}> */}
              <button className="btn btn-warning btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_return_whitelist" onClick={() => this.editItem(index)}>
                Edit
              </button>
              <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_Lihat" onClick={() => this.editItem(index)}>
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
    const { selectedImage, editingItem, judul } = this.state;
    return (
      <>
        <div class="container-fluid">
          <div className="float-sm-right mb-3">
            <button className="btn-primary btn" data-toggle="modal" data-target="#modal_tambah_Banner">
              + Tambah Banner
            </button>
          </div>
          <div class="table-responsive p-0 pb-2">
            <table id="tablebanner" className="table align-items-center justify-content-center mb-0 table-striped">
              <thead>
                <tr>
                  <th className="text-uppercase  text-sm ">#</th>
                  <th className="text-uppercase  text-sm ">Judul</th>
                  <th className="text-uppercase  text-sm ">Tanggal Upload</th>
                  <th className="text-uppercase  text-sm text-center">Action</th>
                </tr>
              </thead>

              <tbody>{this.showTable()}</tbody>
            </table>
          </div>
          {/* MODALS TAMBAH */}
          <div
            className={`modal fade ${this.state.isModalOpen ? "show" : ""}`}
            id="modal_tambah_Banner"
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
                    Tambah Banner
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                          <div className="">{selectedImage && <img src={selectedImage} alt="Preview" style={{ width: "50%" }} />}</div>
                          <input type="file" accept=".png" onChange={this.handleImageUploadADD} />
                        </div>
                      </div>
                    </div>
                    <div className="row px-5 text-md">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="text-sm">Judul Banner : </label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <input type="text" className="form-control text-sm font-weight-bold" value={judul} onChange={(e) => this.setState({ judul: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>
                    Batal
                  </button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.saveNewData}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* END OF MODALSTAMBAH */}
          {/* MODALS EDIT */}
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
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                          <div className="">{selectedImage && <img src={selectedImage} alt="Preview" style={{ width: "50%" }} />}</div>
                          <input type="file" accept=".png" onChange={this.handleImageUpload} />
                        </div>
                      </div>
                    </div>
                    <div className="row px-5 text-md">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="text-sm">Judul Banner</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control text-sm font-weight-bold"
                            value={this.state.editingItem.judul}
                            onChange={(e) =>
                              this.setState({
                                editingItem: {
                                  ...this.state.editingItem,
                                  judul: e.target.value,
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
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>
                    Batal
                  </button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.saveChanges}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* END OF MODALSEDIT */}
          {/* MODALS LIHAT */}
          <div
            className={`modal fade ${this.state.isModalOpen ? "show" : ""}`}
            id="modal_Lihat"
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
                    Lihat Banner
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
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
                        <div className="">{editingItem.foto_banner ? <img src={`data:image/png;base64,${editingItem.foto_banner}`} alt="Preview" style={{ width: "50%" }} /> : <p>Image Missing</p>}</div>
                      </div>
                    </div>
                    <div className="row px-5 text-md">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="text-sm">Judul Banner</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <input type="text" className="form-control text-sm font-weight-bold" value={this.state.editingItem.judul} readOnly />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* END OF MODALSLIHAT */}
        </div>

        {/* MODAL APALAGI */}
      </>
    );
  }
}

export default TableBanner;
