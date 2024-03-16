import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

export default function ButtonRiwayat(user_id) {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [dataNasabah, setDataNasabah] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  const form = useForm({
    defaultValues: {
      user_id: formData.user_id,
      nama: formData.nama,
      nomor_handphone: formData.nomor_handphone,
      avatar: formData.avatar,
      alamat: formData.alamat,
    },
  });

  const addForm = useForm({
    nama: "",
    nomor_handphone: 0,
    thumbnail: "",
    alamat: "",
    stok: 0,
  });

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
          user_id: ids,
          nama: formData.nama,
          nomor_handphone: formData.nomor_handphone,
          // tgl_verifikasi: "?",
          alamat: formData.alamat,
          avatar: formData.avatar,
        },
        { headers }
      );
      setFormData(response.data.data);
      console.log(response.data.data);
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

  const evidenceRef = useRef(null);
  const handleGambar = (e) => {
    const gambarmu = e.target.files?.[0];
    if (gambarmu) {
      const imageUrl = URL.createObjectURL(gambarmu);
      setSelectedImage(imageUrl);
    }
    form.setValue("thumbnail", gambarmu);
  };

  const handleUpdate = async (formData) => {
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" };
    try {
      const formDataWithFile = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "avatar" && key !== "user_id") {
          formDataWithFile.append(key, value);
        }
      });
      if (formData.thumbnail) {
        formDataWithFile.append("avatar", formData.avatar);
      }
      for (var pair of formDataWithFile.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await axios.put(`https://devel4-filkom.ub.ac.id/bank-sampah/user/${formData.user_id}`, formDataWithFile, { headers });
      if (response.status === 200) {
        alert("Berhasil mengubah isi ");
      } else {
        alert("Gagal mengubah isi ");
      }
      console.log(response);
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error("Error program:", error);
    }
  };

  // Function to format the date
  const formatDate = (dateObj) => {
    const { day, month, year } = dateObj;
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <button className="btn btn-success btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_tiwayat_transaksi">
        Riwayat
      </button>

      {/* MODAL RIWAYAT */}
      <div className="modal fade" id="modal_detail_nasabah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Riwayat Transaksi Nasabah
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body justify-content-center">
              <div className="container-fluid">
                <div className="row">
                  {/* PROFILE */}
                  <div className="mt-5 col-md-3">
                    <div className="text-center">
                      <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <form className="m-5">
                      <div className="form-group row ">
                        <label className="col-sm-5 col-form-label">ID Nasabah</label>
                        <div className="col-sm-7 ">
                          <div type="text" className="mt-2  font-weight-bold">
                            : 100104
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-5">Nama</label>
                        <div className="col-sm-7">
                          <div className=" font-weight-bold">: Harry Styles</div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                          No HP / WA
                        </label>
                        <div className="col-sm-7">
                          <div className="mt-2 font-weight-bold">: 085155280972</div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                          Verifikator
                        </label>
                        <div className="col-sm-7">
                          <div className="mt-2 font-weight-bold">: Mimi Kapaldi</div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                          Alamat Nasabah
                        </label>
                        <div className="col-sm-7">
                          <div className=" font-weight-bold mt-2">: Di kota Malang dekat UB</div>
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
                        </tbody>
                      </table>
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
                              <button className="btn btn-success">transaksi</button>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
