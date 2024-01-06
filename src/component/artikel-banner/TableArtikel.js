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
    id: "ARTIKEL01",
    judul: "Bank Sampah Delima, Bank Sampah Terbaik",
    jenis: "gBlok",
    tanggal_upload: "10-01-2023 13:14",
    foto_artikel: "Beras ABC.jpg",
    paragraf:
      "Sebagian besar masyarakat pasti sudah tak sabar untuk menikmati libur panjang alias long weekend mulai dari Kamis (1 Juni 2023) sampai Minggu (4 Juni 2023) bersama keluarga hingga sahabat.",
  },
];

class TableArtikel extends Component {
  constructor() {
    super();
    this.state = {
      data_Artikel: [],
      id: "",
      judul: "",
      jenis: "",
      paragraf: "",
      tanggal_upload: "",
      foto_artikel: "",
      action: "",
      editingItemIndex: -1,
      editingItem: {},
      isModalOpen: false,
      selectedImage: null,
    };
  }

  editItem = (index) => {
    const editingItem = { ...this.state.data_Artikel[index] };
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

  deleteItem = (index) => {
    if (window.confirm("Apakah anda yakin ingin menghapus artikel ini?????")) {
      const newData = [...this.state.data_Artikel];
      newData.splice(index, 1);

      this.setState(
        {
          data_Artikel: newData,
        },
        () => {
          console.log("Data setelah dihapus:", this.state.data_Artikel);
          toastr.success("Data telah dihapus!", "Berhasil!");
        }
      );
    }
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
            foto_artikel: reader.result.split(",")[1],
          },
          selectedImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      this.setState((prevState) => ({
        editingItem: {
          ...prevState.editingItem,
          foto_artikel: reader.result,
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
          foto_artikel: reader.result.split(",")[1],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // NewData
  saveNewData = () => {
    const { judul, jenis, paragraf, foto_artikel, data_Artikel } = this.state;

    // Validate required fields
    if (!judul || !jenis || !paragraf || !foto_artikel) {
      alert("Please fill in all fields.");
      return;
    }

    const newData = [
      ...data_Artikel,
      {
        judul,
        jenis,
        paragraf,
        tanggal_upload: new Date().toLocaleString(),
        foto_artikel,
      },
    ];

    this.setState(
      {
        data_Artikel: newData,
        judul: "",
        jenis: "",
        paragraf: "",
        foto_artikel: "",
        isModalOpen: false,
        selectedImage: null,
      },
      () => {
        console.log("Data setelah disimpan:", this.state.data_Artikel);
      }
    );
  };

  // ChangeEdit
  saveChanges = () => {
    const { editingItemIndex, editingItem, data_Artikel } = this.state;

    // Validate required fields
    if (
      !editingItem.judul ||
      !editingItem.jenis ||
      !editingItem.paragraf ||
      !editingItem.foto_artikel
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a copy of the data_Artikel array
    const newData = [...data_Artikel];

    // Update the edited item with the new data
    newData[editingItemIndex] = {
      ...editingItem,
      tanggal_upload: new Date().toLocaleString(),
    };

    // Update state with the new data and close the modal
    this.setState(
      {
        data_Artikel: newData,
        editingItemIndex: -1,
        editingItem: {},
        isModalOpen: false,
        selectedImage: null,
      },
      () => {
        console.log("Data setelah disimpan:", this.state.data_Artikel);
      }
    );
  };

  // component didmount
  componentDidMount() {
    this.setState({ data_Artikel: names });
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

  showTable = () => {
    try {
      return this.state.data_Artikel.map((item, index) => {
        return (
          <tr>
            <td className="mt-1 mx-2">{index + 1}</td>
            <td className="mt-1 mx-2">{item.judul}</td>
            {/* <td className="text-xs font-weight-bold">{item.firstname + " " + item.lastname}</td> */}
            <td className="mt-1 mx-2">{item.tanggal_upload}</td>
            <td className="d-flex justify-content-center">
              {/* <button className="btn btn-info btn-sm mt-1 mx-2" onClick={() => this.ubahData(paket.id_paket)}> */}
              <button
                className="btn btn-warning btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_edit"
                onClick={() => this.editItem(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-primary btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_LihatArtikel"
                onClick={() => this.editItem(index)}
              >
                Lihat
              </button>
              <button
                className="btn btn-danger btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_tiwayat_transaksi"
                onClick={() => this.deleteItem(index)}
              >
                Hapus
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
    const { selectedImage, judul, jenis, paragraf, editingItem } = this.state;
    return (
      <>
        <div class="container-fluid">
          <div className="float-sm-right mb-3">
            <button
              className="btn-primary btn"
              data-toggle="modal"
              data-target="#modal_tambah_Artikel"
            >
              + Tambah Artikel
            </button>
          </div>
          <div class="table-responsive p-0 pb-2">
            <table
              id="tableartikel"
              className="table align-items-center justify-content-center mb-0 table-striped"
            >
              <thead>
                <tr>
                  <th className="text-uppercase  text-sm ">#</th>
                  <th className="text-uppercase  text-sm ">Judul</th>
                  <th className="text-uppercase  text-sm ">Tanggal Upload</th>
                  <th className="text-uppercase  text-sm text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>{this.showTable()}</tbody>
            </table>
          </div>
        </div>
        {/* MODALS TAMBAH */}
        <div
          className={`modal fade ${this.state.isModalOpen ? "show" : ""}`}
          id="modal_tambah_Artikel"
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
                  Tambah Artikel
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
                          onChange={this.handleImageUploadADD}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row px-5 text-md">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="text-sm">Judul Artikel: </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control text-sm font-weight-bold"
                          value={judul}
                          onChange={(e) =>
                            this.setState({ judul: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row px-5 text-md">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="text-sm">Jenis Artikel: </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control text-sm font-weight-bold"
                          value={jenis}
                          onChange={(e) =>
                            this.setState({ jenis: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row px-5 text-md">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="text-sm">Isi Paragraf: </label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <textarea
                          type="text"
                          className="form-control text-sm font-weight-bold"
                          rows="5"
                          value={paragraf}
                          onChange={(e) =>
                            this.setState({ paragraf: e.target.value })
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
                  data-dismiss="modal"
                  onClick={this.saveNewData}
                >
                  Simpan & Publikasi
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* END OF MODALSTAMBAH */}
        {/* MODALS EDIT */}
        <div
          className={`modal fade ${this.state.isModalOpen ? "show" : ""}`}
          id="modal_edit"
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
                        <label className="text-sm">Judul Artikel</label>
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
                  <div className="row px-5 text-md">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="text-sm">Jenis Artikel</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control text-sm font-weight-bold"
                          value={this.state.editingItem.jenis}
                          onChange={(e) =>
                            this.setState({
                              editingItem: {
                                ...this.state.editingItem,
                                jenis: e.target.value,
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
                        <label className="text-sm">Paragraf Artikel</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <textarea
                          type="text"
                          className="form-control text-sm font-weight-bold"
                          rows="5"
                          value={this.state.editingItem.paragraf}
                          onChange={(e) =>
                            this.setState({
                              editingItem: {
                                ...this.state.editingItem,
                                paragraf: e.target.value,
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
                  data-dismiss="modal"
                  onClick={this.saveChanges}
                >
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
          id="modal_LihatArtikel"
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
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.closeModal}
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
                        {editingItem.foto_artikel ? (
                          <img
                            src={`data:image/png;base64,${editingItem.foto_artikel}`}
                            alt="Preview"
                            style={{ width: "50%" }}
                          />
                        ) : (
                          <p>Image Missing</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row px-5 text-md">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="text-sm">Judul Artikel</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control text-sm font-weight-bold"
                          value={this.state.editingItem.judul}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row px-5 text-md">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="text-sm">Jenis Artikel</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control text-sm font-weight-bold"
                          value={this.state.editingItem.jenis}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row px-5 text-md">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="text-sm">Isi Artikel</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        {/* <input
                          type="text"
                          className="form-control text-sm font-weight-bold"
                          value={this.state.editingItem.paragraf}
                          readOnly
                        > */}
                        <textarea
                          type="text"
                          className="form-control text-sm font-weight-bold"
                          rows="5"
                          value={this.state.editingItem.paragraf}
                          readOnly
                        ></textarea>
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
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* END OF MODALSLIHAT */}
        {/* MODAL APALAGI */}
      </>
    );
  }
}

export default TableArtikel;
