import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

const Sampah = [
  {
    id_nasabah: 222,
    name_nasabah: "Andi Lalapan",
    berat_nasabah: "Ditolak",
    poin_nasabah: 700,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
];

const TableDataNasabah = () => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [dataNasabah, setDataNasabah] = useState({});
  const [formData, setFormData] = useState({});
  const modalRef = useRef(null);

  const getDataNasabah = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/user?status=1&isPagination=false", { headers });
      setDataNasabah(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPermintaanID = async (ids) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `https://devel4-filkom.ub.ac.id/bank-sampah/user/${ids}/history`,
        {
          id: ids,
          nama: formData.nama,
          harga_tukar_poin: formData.harga_tukar_poin,
          img_url: formData.img_url,
          items_sampah: formData.list_sampah,
        },
        { headers }
      );
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDetailClick = async (id) => {
    try {
      await getPermintaanID(id);
      modalRef.current.open = true;
    } catch (error) {
      console.error("Error handling detail click:", error);
    }
  };

  // Function to format the date
  const formatDate = (dateObj) => {
    const { day, month, year } = dateObj;
    return `${day}/${month}/${year}`;
  };

  const showTable = () => {
    try {
      return dataNasabah.map((item, index) => {
        return (
          <tr key={index}>
            <td className="mt-1 mx-2 text-center">{item.user_id}</td>
            <td className="mt-1 mx-2 text-center">{item.nama}</td>
            <td className="text-center justify-content-center flex">{item.nomor_handphone}</td>
            <td className="mt-1 mx-2 text-center">{item.alamat}</td>
            <td className="d-flex justify-content-center">
              <button
                className="btn btn-primary btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_liat_data_nasabah"
                // onClick={() => this.handleLihatNasabah(item.id_nasabah)}
                // onClick={() => handleDetailClick(item.user_id)}
              >
                Lihat
              </button>
              <button className="btn btn-success btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_tiwayat_transaksi">
                Riwayat
              </button>
              <button
                className="btn btn-warning btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_edit_nasabah"
                // onClick={() => this.editItem(index)}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      });
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        // console.log(tes);
        getDataNasabah();
      } else {
        setAuthUser(null);
      }
    });

    // Hanya inisialisasi DataTable jika belum diinisialisasi sebelumnya
    if (!$.fn.DataTable.isDataTable("#table")) {
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
              {
                extend: "csv",
                className: "btn btn-dark bg-dark",
              },
              {
                extend: "print",
                customize: function (win) {
                  $(win.document.body).css("font-size", "10pt");
                  $(win.document.body).find("table").addClass("compact").css("font-size", "inherit");
                },
                className: "btn btn-secondary bg-secondary",
              },
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

    // Membersihkan listener saat komponen dibongkar
    return () => {
      listen();
    };
  }, [formData]);

  return (
    <>
      <div className="container-fluid">
        <div className="table-responsive p-0 pb-2">
          <table id="table" className="table align-items-center justify-content-center mb-0 table-striped">
            <thead>
              <tr>
                <th className="text-uppercase  text-sm text-center">ID Nasabah</th>
                <th className="text-uppercase  text-sm text-center">Nama Nasabah</th>
                <th className="text-uppercase  text-sm text-center">No. Telepon</th>
                <th className="text-uppercase  text-sm text-center">Alamat</th>
                <th className="text-uppercase  text-sm text-center">Action</th>
              </tr>
            </thead>
            <tbody>{showTable()}</tbody>
          </table>
        </div>
        {/* modal detail  */}
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
                              :
                            </div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-5">Nama</label>
                          <div class="col-sm-7">
                            <div className=" font-weight-bold">: nama</div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="inputPassword" class="col-sm-5 col-form-label">
                            No HP / WA
                          </label>
                          <div class="col-sm-7">
                            <div className="mt-2 font-weight-bold">: 09</div>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label for="inputPassword" class="col-sm-5 col-form-label">
                            Alamat Nasabah
                          </label>
                          <div class="col-sm-7">
                            <div className=" font-weight-bold mt-2">: jalan</div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* info dkk */}
                    <div className="col-md-7 custom-border">
                      <div className="btn-group ml-3">
                        {/* <button className={`btn ${activeButtonEdit === "Info Nasabah" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClickonEdit("Info Nasabah")}>
                          Info Nasabah
                        </button>
                        <button className={`btn ${activeButtonEdit === "Ubah Password" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClickonEdit("Ubah Password")}>
                          Ubah Password
                        </button>
                        <button className={`btn ${activeButtonEdit === "Hapus Akun" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => this.handleButtonClickonEdit("Hapus Akun")}>
                          Hapus Akun
                        </button> */}
                        <button className="btn-primary" onClick={() => this.handleButtonClickonEdit("Info Nasabah")}>
                          Info Nasabah
                        </button>
                        <button className="btn-primary" onClick={() => this.handleButtonClickonEdit("Ubah Password")}>
                          Ubah Password
                        </button>
                        <button className="btn-primary" onClick={() => this.handleButtonClickonEdit("Hapus Akun")}>
                          Hapus Akun
                        </button>
                      </div>
                      {/* TABLE */}
                      <div className="col-md-12 mt-4 full-width">
                        {/* {showInfoTable && ( */}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="namaNasabah">Nama Nasabah</label>
                              <input
                                type="text"
                                className="form-control"
                                id="namaNasabah"
                                placeholder="Nama"
                                // onChange={(e) => this.handleEditInputChange("name_nasabah", e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="noHpWa">No HP/WA</label>
                              <input
                                type="text"
                                className="form-control"
                                id="noHpWa"
                                placeholder="Nomor HP"
                                // onChange={(e) => this.handleEditInputChange("no_telp", e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label for="alamat">Alamat</label>
                              <input
                                type="text"
                                className="form-control"
                                id="alamat"
                                placeholder="Alamat"
                                // onChange={(e) => this.handleEditInputChange("address_nasabah", e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="modal-footer float-sm-right">
                            <button
                              type="button"
                              className="btn btn-primary "
                              data-dismiss="modal"
                              // onClick={this.handleEditNasabah}
                            >
                              Simpan
                            </button>
                          </div>
                        </div>
                        {/* )} */}
                        {/* {showUbahTable && ( */}
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
                        {/* )} */}
                        {/* {showHapusTable && ( */}
                        <div className="">
                          <div className="col-md-10">
                            <div className="form-group">
                              <div className="bg-red font-weight-bold pl-3 text-white text-lg">Perhatian!</div>
                              <div className="bg-grey text-black text-md py-3">
                                <div className="font-weight-semibold text-justify">Dengan menekan tombol “Hapus Akun” dibawah, akun nasabah beserta data yang telah ada akan terhapus secara permanen dan tidak dapat dipulihkan lagi.</div>
                                <button
                                  type="button"
                                  className="text-left btn bg-red text-white text-md my-3"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  // onClick={this.handleDeleteNasabah}
                                >
                                  <span className=" px-2 py-2 font-weight-semibold" aria-hidden="true">
                                    Hapus Akun
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* )} */}
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
                  {/* {this.state.selectedNasabah && ( */}
                  <>
                    <div class="form-group row ">
                      <label class="col-sm-5 col-form-label">ID Nasabah</label>
                      <div class="col-sm-7 ">
                        <div type="text" className="mt-2  font-weight-bold">
                          :
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-5">Nama</label>
                      <div class="col-sm-7">
                        <div className=" font-weight-bold">: </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputPassword" class="col-sm-5 col-form-label">
                        No HP / WA
                      </label>
                      <div class="col-sm-7">
                        <div className="mt-2 font-weight-bold">: </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputPassword" class="col-sm-5 col-form-label">
                        Alamat Nasabah
                      </label>
                      <div class="col-sm-7">
                        <div className=" font-weight-bold mt-2">: </div>
                      </div>
                    </div>
                  </>
                  {/* )} */}
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
                        <button
                          className="btn-primary"
                          // onClick={() => this.handleButtonClick("Semua")}
                        >
                          Semua
                        </button>
                        <button
                          className="btn-primary"
                          // onClick={() => this.handleButtonClick("Sampah")}
                        >
                          Sampah
                        </button>
                        <button
                          className="btn-primary"
                          // onClick={() => this.handleButtonClick("Sembako")}
                        >
                          Sembako
                        </button>
                      </div>

                      {/* TABLE */}
                      <div className="mt-4 text-sm">
                        {/* {showSemuaTable && ( */}
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
                            {/* {sampah.map((item) => (
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
                            ))} */}
                            {/* {sampah.map((item) => ( */}
                            <tr>
                              <td>id</td>
                              <td>tgl sembako</td>
                              <td>petugas</td>
                              <td>
                                <button className="btn btn-warning">transaksi</button>
                              </td>
                              <td>poin</td>
                              <td>
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                  Detail
                                </button>
                              </td>
                            </tr>
                            {/* ))} */}
                          </tbody>
                        </table>
                        {/* )} */}
                        {/* {showSampahTable && ( */}
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
                            {/* {sampah
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
                              ))} */}
                            {/* {sampah
                              .filter((item) => item.transaksi === "Tukar Sampah")
                              .map((item) => ( */}
                            <tr>
                              <td>id_sembako</td>
                              <td>tanggal_sembako</td>
                              <td>petugas</td>
                              <td>
                                <button className="btn btn-warning">transaksi</button>
                              </td>
                              <td>poin</td>
                              <td>
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                  Detail
                                </button>
                              </td>
                            </tr>
                            {/* ))} */}
                          </tbody>
                        </table>
                        {/* )} */}
                        {/* {showSembakoTable && ( */}
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
                            {/* {sampah
                              .filter((item) => item.transaksi === "Tukar Sembako")
                              .map((item) => ( */}
                            <tr>
                              <td>id_sembako</td>
                              <td>tanggal_sembako</td>
                              <td>petugas</td>
                              <td>
                                <button className="btn btn-success">transaksi</button>
                              </td>
                              <td>poin</td>
                              <td>
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                  Detail
                                </button>
                              </td>
                            </tr>
                            {/* ))} */}
                          </tbody>
                        </table>
                        {/* )} */}
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
                        <button
                          className="btn btn-primary"
                          // onClick={() => this.handleButtonClick("Semua")}
                        >
                          Semua
                        </button>
                        <button
                          className="btn btn-primary"
                          // onClick={() => this.handleButtonClick("Sampah")}
                        >
                          Sampah
                        </button>
                        <button
                          className="btn btn-primary"
                          // onClick={() => this.handleButtonClick("Sembako")}
                        >
                          Sembako
                        </button>
                      </div>

                      {/* START TABLE */}
                      <div className="mt-4 text-sm">
                        {/* {showSemuaTable && ( */}
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
                            {/* {sampah.map((item) => ( */}
                            <tr>
                              <td>id_sembako</td>
                              <td>tanggal_sembako</td>
                              <td>petugas</td>
                              <td>
                                <button className="btn btn-primary">transaksi</button>
                              </td>
                              <td>poin</td>
                              <td>
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                  Detail
                                </button>
                              </td>
                            </tr>
                            {/* ))} */}
                          </tbody>
                        </table>
                        {/* )} */}
                        {/* {showSampahTable && ( */}
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
                            <tr>
                              <td>id_sembako</td>
                              <td>tanggal_sembako</td>
                              <td>petugas</td>
                              <td>
                                <button className="btn btn-warning">transaksi</button>
                              </td>
                              <td>poin</td>
                              <td>
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                  Detail
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {/* )} */}
                        {/* {showSembakoTable && ( */}
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
                            <tr>
                              <td>id_sembako</td>
                              <td>tanggal_sembako</td>
                              <td>petugas</td>
                              <td>
                                <button className="btn btn-warning">transaksi</button>
                              </td>
                              <td>poin</td>
                              <td>
                                <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                                  Detail
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {/* )} */}
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
        {/* MODAL A☺PALAGI */}
      </div>
    </>
  );
};

export default TableDataNasabah;
