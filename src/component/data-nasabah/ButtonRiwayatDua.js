import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

export default function ButtonRiwayatDua(user_id) {
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
        Riwayat 2
      </button>

      {/* MODAL RIWAYAT DUA*/}
      <div className="modal fade" id="modal_detail_nasabah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                <i className="fas fa-chart-pie mr-1" />
                ID Penukaran XXXXXXXX
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body justify-content-center">
              <div className="container-fluid">
                <div className="row" id="outer-container">
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
    </>
  );
}
