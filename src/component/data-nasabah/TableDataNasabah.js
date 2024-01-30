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
    id_nasabah: 1001011,
    name_nasabah: "Harry hehe",
    no_telp: "081234567893",
    age: 28,
    address_nasabah: "Software Developer",
  },
];

// DATA DUMMY BUAT TABEL RIwAYAT NASABAH
const sampah = [
  {
    id_sembako: 100101,
    tanggal_sembako: "23-Desember-2023",
    Petugas: "Agus",
    transaksi: "Tukar Sembako",
    poin: "- 180 Poin",
  },
  {
    id_sembako: 100102,
    tanggal_sembako: "12-November-2023",
    Petugas: "Sumanto",
    transaksi: "Tukar Sampah",
    poin: "+ 280 Poin",
  },
  {
    id_sembako: 100103,
    tanggal_sembako: "9-Maret-2023",
    Petugas: "Justin",
    transaksi: "Tukar Sembako",
    poin: "- 100 Poin",
  },
];
class TableDataNasabah extends Component {
  constructor() {
    super();
    this.state = {
      data_nasabah: [],
      id_nasabah: "",
      name_nasabah: "",
      no_telp: 0,
      age: 0,
      address_nasabah: "",
      id_sembako: "",
      tanggal_sembako: "",
      Petugas: "",
      transaksi: "",
      poin: "",
      selectedNasabah: null,
      action: "",
      activeButton: "Semua",
      showSemuaTable: true,
      showSampahTable: false,
      showSembakoTable: false,
      activeButtonEdit: "Info Nasabah",
      showInfoTable: true,
      showUbahTable: false,
      showHapusTable: false,
      editingItemIndex: -1,
      editingItem: {},
      isModalOpen: false,
      newNasabah: {
        name_nasabah: "",
        no_telp: "",
        address_nasabah: "",
      },
    };
  }

  editItem = (index) => {
    const editingItem = { ...this.state.data_nasabah[index] };
    this.setState({
      editingItemIndex: index,
      editingItem, // Use the correct editingItem
      isModalOpen: true,
    });
  };

  handleEditInputChange = (field, value) => {
    this.setState((prevState) => ({
      editingItem: {
        ...prevState.editingItem,
        [field]: value,
      },
    }));
  };

  handleDeleteNasabah = async () => {
    const { editingItem } = this.state;
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus nasabah ini?");

    if (confirmDelete) {
      try {
        const newData = this.state.data_nasabah.filter((nasabah) => nasabah.id_nasabah !== editingItem.id_nasabah);

        // Close the modal after 500 milliseconds (adjust the time as needed)
        await new Promise((resolve) => setTimeout(resolve, 500));
        toastr.success("Data berhasil dihapus!", "");
        this.setState({
          data_nasabah: newData,
          isModalOpen: false,
          showAlert: true,
          alertType: "success",
        });
      } catch (error) {
        console.error("Error deleting nasabah:", error);
        toastr.error("Data Gagal Dihapus!", "Silahkan Coba lagi ");
        this.setState({
          showAlert: true,
          alertType: "danger",
          alertMessage: "Gagal menghapus data nasabah. Coba lagi nanti.",
        });
      }
    }
  };

  handleEditNasabah = () => {
    console.log("Editing Nasabah...");

    const { editingItemIndex, editingItem, data_nasabah } = this.state;

    // Validasi input (tambahkan validasi sesuai kebutuhan)
    if (!editingItem.name_nasabah || !editingItem.no_telp || !editingItem.address_nasabah) {
      alert("Semua field harus diisi");
      return;
    }

    console.log("Editing Nasabah Index:", editingItemIndex);
    console.log("Editing Nasabah Data:", editingItem);

    // Buat salinan array data_nasabah
    const newData = [...data_nasabah];

    // Perbarui item yang diedit dengan data yang baru
    newData[editingItemIndex] = {
      ...newData[editingItemIndex],
      ...editingItem,
    };

    // Perbarui state dengan data yang baru, reset form, dan tutup modal
    this.setState(
      {
        data_nasabah: newData,
        editingItemIndex: -1,
        editingItem: {},
        isModalOpen: false,
      },
      () => {
        console.log("Data setelah disimpan:", this.state.data_nasabah);
      }
    );
  };

  handleLihatNasabah = (selectedId) => {
    const selectedNasabah = names.find((nasabah) => nasabah.id_nasabah === selectedId);
    this.setState({ selectedNasabah });
  };

  lihatItem = (index) => {
    const editingItem = names[index];
    this.setState({
      editingItemIndex: index,
      editingItem: { ...editingItem },
    });
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

  handleButtonClick = (buttonName) => {
    this.setState({ activeButton: buttonName });

    if (buttonName === "Semua") {
      this.setState({
        showSemuaTable: true,
        showSampahTable: false,
        showSembakoTable: false,
      });
    } else if (buttonName === "Sampah") {
      this.setState({
        showSemuaTable: false,
        showSampahTable: true,
        showSembakoTable: false,
      });
    } else if (buttonName === "Sembako") {
      this.setState({
        showSemuaTable: false,
        showSampahTable: false,
        showSembakoTable: true,
      });
    }
  };

  handleButtonClickonEdit = (buttonName) => {
    this.setState({ activeButtonEdit: buttonName });

    if (buttonName === "Info Nasabah") {
      this.setState({
        showInfoTable: true,
        showUbahTable: false,
        showHapusTable: false,
      });
    } else if (buttonName === "Ubah Password") {
      this.setState({
        showInfoTable: false,
        showUbahTable: true,
        showHapusTable: false,
      });
    } else if (buttonName === "Hapus Akun") {
      this.setState({
        showInfoTable: false,
        showUbahTable: false,
        showHapusTable: true,
      });
    }
  };

  showTable = () => {
    try {
      return this.state.data_nasabah.map((item, index) => {
        return (
          <tr key={item.id_nasabah}>
            <td className="mt-1 mx-2">{index + 1}</td>
            <td className="mt-1 mx-2">{item.id_nasabah}</td>
            {/* <td className="text-xs font-weight-bold">{item.firstname + " " + item.lastname}</td> */}
            <td className="mt-1 mx-2">{item.name_nasabah}</td>
            <td className="mt-1 mx-2">{item.no_telp}</td>
            <td className="mt-1 mx-2">{item.address_nasabah}</td>
            <td className="d-flex justify-content-center">
              {/* <button className="btn btn-info btn-sm mt-1 mx-2" onClick={() => this.ubahData(paket.id_paket)}> */}
              <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_liat_data_nasabah" onClick={() => this.handleLihatNasabah(item.id_nasabah)}>
                Lihat
              </button>
              <button className="btn btn-success btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_tiwayat_transaksi">
                Riwayat
              </button>
              <button className="btn btn-warning btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_edit_nasabah" onClick={() => this.editItem(index)}>
                Edit
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
    const { activeButton, showSemuaTable, showSampahTable, showSembakoTable } = this.state;
    const { activeButtonEdit, showInfoTable, newNasabah, showUbahTable, showHapusTable } = this.state;

    return (
      <>
        <div class="container-fluid">
          <div class="table-responsive p-0 pb-2">
            <table id="table" className="table align-items-center justify-content-center mb-0 table-striped">
              <thead>
                <tr>
                  <th className="text-uppercase   ">#</th>
                  <th className="text-uppercase  text-sm ">ID Nasabah</th>
                  <th className="text-uppercase  text-sm ">Nama Nasabah</th>
                  <th className="text-uppercase  text-sm ">No. Telepon</th>
                  <th className="text-uppercase  text-sm ">Alamat</th>
                  <th className="text-uppercase  text-sm ">Action</th>
                </tr>
              </thead>

              <tbody>{this.showTable()}</tbody>
            </table>
          </div>
        </div>
        {/* MODAL EDIT DATA NASABAH SECTION */}
        <div class="modal fade" id="modal_edit_nasabah" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  Edit Data Nasabah
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body justify-content-center">
                <div className="container-fluid">
                  <div className="row" id="outer-container">
                    {/* PROFIL */}
                    <div className="col-md-5" id="">
                      <div className="text-center">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                      </div>
                      <form className="m-5">
                        <div class="form-group row ">
                          <label class="col-sm-5 col-form-label">ID Nasabah</label>
                          <div class="col-sm-7 ">
                            <div type="text" className="mt-2  font-weight-bold">
                              : {this.state.editingItem.id_nasabah}
                            </div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-5">Nama</label>
                          <div class="col-sm-7">
                            <div className=" font-weight-bold">: {this.state.editingItem.name_nasabah}</div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="inputPassword" class="col-sm-5 col-form-label">
                            No HP / WA
                          </label>
                          <div class="col-sm-7">
                            <div className="mt-2 font-weight-bold">: {this.state.editingItem.no_telp}</div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="inputPassword" class="col-sm-5 col-form-label">
                            Alamat Nasabah
                          </label>
                          <div class="col-sm-7">
                            <div className=" font-weight-bold mt-2">: {this.state.editingItem.address_nasabah}</div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* info dkk */}
                    <div className="col-md-7 custom-border">
                      <div className="btn-group ml-3">
                        <button className={`btn ${activeButtonEdit === "Info Nasabah" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClickonEdit("Info Nasabah")}>
                          Info Nasabah
                        </button>
                        <button className={`btn ${activeButtonEdit === "Ubah Password" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClickonEdit("Ubah Password")}>
                          Ubah Password
                        </button>
                        <button className={`btn ${activeButtonEdit === "Hapus Akun" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClickonEdit("Hapus Akun")}>
                          Hapus Akun
                        </button>
                      </div>
                      {/* TABLE */}
                      <div className="col-md-12 mt-4 full-width">
                        {showInfoTable && (
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label for="namaNasabah">Nama Nasabah</label>
                                <input type="text" className="form-control" id="namaNasabah" placeholder="Nama" value={this.state.editingItem.name_nasabah} onChange={(e) => this.handleEditInputChange("name_nasabah", e.target.value)} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label for="noHpWa">No HP/WA</label>
                                <input type="text" className="form-control" id="noHpWa" placeholder="Nomor HP" value={this.state.editingItem.no_telp} onChange={(e) => this.handleEditInputChange("no_telp", e.target.value)} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label for="alamat">Alamat</label>
                                <input type="text" className="form-control" id="alamat" placeholder="Alamat" value={this.state.editingItem.address_nasabah} onChange={(e) => this.handleEditInputChange("address_nasabah", e.target.value)} />
                              </div>
                            </div>
                            <div className="modal-footer float-sm-right">
                              <button type="button" className="btn btn-primary " data-dismiss="modal" onClick={this.handleEditNasabah}>
                                Simpan
                              </button>
                            </div>
                          </div>
                        )}
                        {showUbahTable && (
                          <div className="">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label for="namaNasabah">Password Baru</label>
                                <input type="password" className="form-control" id="PwdChange" placeholder="" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label for="noHpWa">Konfirmasi Password</label>
                                <input type="password" className="form-control" id="PwdConf" placeholder="" />
                              </div>
                            </div>
                          </div>
                        )}
                        {showHapusTable && (
                          <div className="">
                            <div className="col-md-10">
                              <div className="form-group">
                                <div className="bg-red font-weight-bold pl-3 text-white text-lg">Perhatian!</div>
                                <div className="bg-grey text-black text-md py-3">
                                  <div className="font-weight-semibold text-justify">Dengan menekan tombol “Hapus Akun” dibawah, akun nasabah beserta data yang telah ada akan terhapus secara permanen dan tidak dapat dipulihkan lagi.</div>
                                  <button type="button" className="text-left btn bg-red text-white text-md my-3" data-dismiss="modal" aria-label="Close" onClick={this.handleDeleteNasabah}>
                                    <span className=" px-2 py-2 font-weight-semibold" aria-hidden="true">
                                      Hapus Akun
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  <img src="dist/img/avatar5.png" className="img-circle elevation-2" alt="User Image" />
                </div>
                <form className="m-5">
                  {this.state.selectedNasabah && (
                    <>
                      <div class="form-group row ">
                        <label class="col-sm-5 col-form-label">ID Nasabah</label>
                        <div class="col-sm-7 ">
                          <div type="text" className="mt-2  font-weight-bold">
                            : {this.state.selectedNasabah.id_nasabah}
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-5">Nama</label>
                        <div class="col-sm-7">
                          <div className=" font-weight-bold">: {this.state.selectedNasabah.name_nasabah}</div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-5 col-form-label">
                          No HP / WA
                        </label>
                        <div class="col-sm-7">
                          <div className="mt-2 font-weight-bold">: {this.state.selectedNasabah.no_telp}</div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-5 col-form-label">
                          Alamat Nasabah
                        </label>
                        <div class="col-sm-7">
                          <div className=" font-weight-bold mt-2">: {this.state.selectedNasabah.address_nasabah}</div>
                        </div>
                      </div>
                    </>
                  )}
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
        {/* MODAL rIWAYAT NASABAH SECTION ORI (GANTI id ke modal_detail_nasabah buat ngaktifin terus ganti id yg satunya)*/}
        <div class="modal fade" id="modal_tiwayat_transaksi1" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
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
                <div Class="container-fluid">
                  <div class="row">
                    {/* PROFILE */}
                    <div className="mt-5 col-md-3">
                      <div className="text-center">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                      </div>
                      <form className="m-5">
                        <div class="form-group row ">
                          <label class="col-sm-5 col-form-label">ID Nasabah</label>
                          <div class="col-sm-7 ">
                            <div type="text" className="mt-2  font-weight-bold">
                              : 100104
                            </div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-5">Nama</label>
                          <div class="col-sm-7">
                            <div className=" font-weight-bold">: Harry Styles</div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="inputPassword" class="col-sm-5 col-form-label">
                            No HP / WA
                          </label>
                          <div class="col-sm-7">
                            <div className="mt-2 font-weight-bold">: 085155280972</div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="inputPassword" class="col-sm-5 col-form-label">
                            Verifikator
                          </label>
                          <div class="col-sm-7">
                            <div className="mt-2 font-weight-bold">: Mimi Kapaldi</div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="inputPassword" class="col-sm-5 col-form-label">
                            Alamat Nasabah
                          </label>
                          <div class="col-sm-7">
                            <div className=" font-weight-bold mt-2">: Di kota Malang deket UB</div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* BUTTONS */}
                    <div className="col-md-9 mt-5">
                      <div className="btn-group ml-3">
                        <button className={`btn ${activeButton === "Semua" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClick("Semua")}>
                          Semua
                        </button>
                        <button className={`btn ${activeButton === "Sampah" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClick("Sampah")}>
                          Sampah
                        </button>
                        <button className={`btn ${activeButton === "Sembako" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClick("Sembako")}>
                          Sembako
                        </button>
                      </div>

                      {/* TABLE */}
                      <div className="mt-4 text-sm">
                        {showSemuaTable && (
                          <table className=" table table-xl table-bordered">
                            <thead className="text-center">
                              <tr className="">
                                <th className="">ID Order</th>
                                <th className="">Waktu</th>
                                <th className="">Petugas</th>
                                <th className="">Tipe Transaksi</th>
                                <th className="">Poin</th>
                                <th className="">Keterangan</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {sampah.map((item) => (
                                <tr key={item.id_sembako}>
                                  <td>{item.id_sembako}</td>
                                  <td>{item.tanggal_sembako}</td>
                                  <td>{item.Petugas}</td>
                                  <td>
                                    <button className={item.transaksi === "Tukar Sembako" ? "btn btn-success" : "btn btn-warning"}>{item.transaksi}</button>
                                  </td>
                                  <td>{item.poin}</td>
                                  <td>
                                    <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                      Detail
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {showSampahTable && (
                          <table className="table table-xl table-bordered ">
                            <thead className="text-center">
                              <tr className="">
                                <th className="">ID Order</th>
                                <th className="">Waktu</th>
                                <th className="">Petugas</th>
                                <th className="">Tipe Transaksi</th>
                                <th className="">Poin</th>
                                <th className="">Keterangan</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {sampah
                                .filter((item) => item.transaksi === "Tukar Sampah")
                                .map((item) => (
                                  <tr key={item.id_sembako}>
                                    <td>{item.id_sembako}</td>
                                    <td>{item.tanggal_sembako}</td>
                                    <td>{item.Petugas}</td>
                                    <td>
                                      <button className="btn btn-warning">{item.transaksi}</button>
                                    </td>
                                    <td>{item.poin}</td>
                                    <td>
                                      <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                        Detail
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        )}
                        {showSembakoTable && (
                          <table className="table table-xl table-bordered">
                            <thead className="text-center">
                              <tr className="">
                                <th className="">ID Order</th>
                                <th className="">Waktu</th>
                                <th className="">Petugas</th>
                                <th className="">Tipe Transaksi</th>
                                <th className="">Poin</th>
                                <th className="">Keterangan</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {sampah
                                .filter((item) => item.transaksi === "Tukar Sembako")
                                .map((item) => (
                                  <tr key={item.id_sembako}>
                                    <td>{item.id_sembako}</td>
                                    <td>{item.tanggal_sembako}</td>
                                    <td>{item.Petugas}</td>
                                    <td>
                                      <button className="btn btn-success">{item.transaksi}</button>
                                    </td>
                                    <td>{item.poin}</td>
                                    <td>
                                      <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                        Detail
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        )}
                      </div>

                      {/* TABLE */}
                    </div>
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
        {/* MODAL rIWAYAT NASABAH SECTION (GANTI id ke modal_detail_nasabah buat ngaktifin terus ganti id yg satunya)*/}
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
                <div Class="container-fluid">
                  <div class="row">
                    {/* BUTTONS */}
                    <div className="col-xl-12 mt-5">
                      <div className="btn-group">
                        <button className={`btn ${activeButton === "Semua" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClick("Semua")}>
                          Semua
                        </button>
                        <button className={`btn ${activeButton === "Sampah" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClick("Sampah")}>
                          Sampah
                        </button>
                        <button className={`btn ${activeButton === "Sembako" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClick("Sembako")}>
                          Sembako
                        </button>
                      </div>

                      {/* START TABLE */}
                      <div className="mt-4 text-sm">
                        {showSemuaTable && (
                          <table className=" table table-xl table-bordered">
                            <thead className="text-center">
                              <tr className="">
                                <th className="">ID Order</th>
                                <th className="">Waktu</th>
                                <th className="">Petugas</th>
                                <th className="">Tipe Transaksi</th>
                                <th className="">Poin</th>
                                <th className="">Keterangan</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {sampah.map((item) => (
                                <tr key={item.id_sembako}>
                                  <td>{item.id_sembako}</td>
                                  <td>{item.tanggal_sembako}</td>
                                  <td>{item.Petugas}</td>
                                  <td>
                                    <button className={item.transaksi === "Tukar Sembako" ? "btn btn-success" : "btn btn-warning"}>{item.transaksi}</button>
                                  </td>
                                  <td>{item.poin}</td>
                                  <td>
                                    <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                      Detail
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {showSampahTable && (
                          <table className="table table-xl table-bordered ">
                            <thead className="text-center">
                              <tr className="">
                                <th className="">ID Order</th>
                                <th className="">Waktu</th>
                                <th className="">Petugas</th>
                                <th className="">Tipe Transaksi</th>
                                <th className="">Poin</th>
                                <th className="">Keterangan</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {sampah
                                .filter((item) => item.transaksi === "Tukar Sampah")
                                .map((item) => (
                                  <tr key={item.id_sembako}>
                                    <td>{item.id_sembako}</td>
                                    <td>{item.tanggal_sembako}</td>
                                    <td>{item.Petugas}</td>
                                    <td>
                                      <button className="btn btn-warning">{item.transaksi}</button>
                                    </td>
                                    <td>{item.poin}</td>
                                    <td>
                                      <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                        Detail
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        )}
                        {showSembakoTable && (
                          <table className="table table-xl table-bordered">
                            <thead className="text-center">
                              <tr className="">
                                <th className="">ID Order</th>
                                <th className="">Waktu</th>
                                <th className="">Petugas</th>
                                <th className="">Tipe Transaksi</th>
                                <th className="">Poin</th>
                                <th className="">Keterangan</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {sampah
                                .filter((item) => item.transaksi === "Tukar Sembako")
                                .map((item) => (
                                  <tr key={item.id_sembako}>
                                    <td>{item.id_sembako}</td>
                                    <td>{item.tanggal_sembako}</td>
                                    <td>{item.Petugas}</td>
                                    <td>
                                      <button className="btn btn-success">{item.transaksi}</button>
                                    </td>
                                    <td>{item.poin}</td>
                                    <td>
                                      <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                        Detail
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        )}
                      </div>

                      {/* END TABLE */}
                    </div>
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
        {/* MODAL DETAIL RIWAYAT */}
        <div class="modal fade" id="modal_detail_nasabah" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  ID Penukaran XXXXXXXX
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body justify-content-center">
                <div className="container-fluid">
                  <div className="row" id="outer-container">
                    {/* info dkk */}
                    <div>
                      <div className="font-weight-semibold ml-4">Profile Penukaran</div>
                      <div className="row">
                        <div className="col-md-8">
                          <div id="ini_left" className="ml-5 bg-grey mt-2 col-md-12">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="text-black font-weight-bold">Nama Nasabah</div>
                                <div>Andi Budiono</div>
                              </div>
                              <div className="col-md-6">
                                <div className="text-black font-weight-bold">Waktu Request</div>
                                <div>2023-01-10 08:14</div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="text-black font-weight-bold">ID Nasabah</div>
                                <div>100104</div>
                              </div>
                              <div className="col-md-6">
                                <div className="text-black font-weight-bold">Petugas</div>
                                <div>Agung</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div id="right" className="col-md-12">
                            <div className="text-black font-weight-bold mt-2 ml-4">Transaksi Selesai</div>
                            <div className="ml-4">2023-01-19 13:14</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* TABLE */}
                    <div className="col-md-12 mt-4 full-width">
                      <table className=" table table-sm table-striped">
                        <thead className="text-center">
                          <tr className="">
                            <th className="">Jenis Sembako</th>
                            <th className="">Berat</th>
                            <th className="">Poin</th>
                            <th className="">Perolehan Poin</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          <tr>
                            <td>Kertas</td>
                            <td>1.5 kg</td>
                            <td>200/0,5 kg</td>
                            <td>+ 600</td>
                          </tr>
                          <tr>
                            <td>Kaca</td>
                            <td>1.5 kg</td>
                            <td>150/0,5 kg</td>
                            <td>+ 450</td>
                          </tr>
                          <tr>
                            <td>Plastik</td>
                            <td>1.5 kg</td>
                            <td>300/0,5 kg</td>
                            <td>+ 900</td>
                          </tr>
                          {/* Tambahkan data lainnya di sini */}
                        </tbody>
                      </table>
                      <div className="row text-right mt-4">
                        <div className="col-md-12 d-flex justify-content-end align-items-end">
                          <div className="text-right">total</div>
                          <div className="font-weight-bold text-right ml-2">2,375 Poin</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL APALAGI */}
      </>
    );
  }
}

export default TableDataNasabah;
