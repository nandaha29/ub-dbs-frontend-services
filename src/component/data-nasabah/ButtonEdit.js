import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

export default function ButtonEdit(user_id) {
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
      <button
        className="btn btn-warning btn-sm mt-1 mx-2"
        data-toggle="modal"
        data-target="#modal_edit_nasabah"
        // onClick={() => this.editItem(index)}
        onClick={() => handleDetailClick(user_id)}
      >
        Edit
      </button>

      {/* MODAL EDIT */}
      <div className="modal fade" ref={modalRef} id="modal_edit_nasabah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                <i className="fas fa-chart-pie mr-1" />
                Edit Data Nasabah
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body justify-content-center">
              <div className="container-fluid">
                <div className="row" id="outer-container">
                  {/* PROFIL */}
                  <div className="col-md-5" id="">
                    <div className="text-center">
                      <div className="">{/* {selectedImage && <img src={selectedImage} alt="Preview" style={{ width: "50%" }} />} */}</div>
                      <input
                        type="file"
                        ref={evidenceRef}
                        className="w-full input-bordered pt-2"
                        accept="image/*"
                        // onChange={handleGambar}
                      />
                    </div>
                    <form className="m-5">
                      <div className="form-group row ">
                        <label className="col-sm-5 col-form-label">ID Nasabah</label>
                        <div className="col-sm-7 ">
                          <div type="text" className="mt-2  font-weight-bold">
                            : {formData.user_id}
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-5">Nama</label>
                        <div className="col-sm-7">
                          <div className=" font-weight-bold">: {formData.nama}</div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                          No HP / WA
                        </label>
                        <div className="col-sm-7">
                          <div className="mt-2 font-weight-bold">: 09</div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                          Alamat Nasabah
                        </label>
                        <div className="col-sm-7">
                          <div className="font-weight-bold mt-2">: jalan</div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* info dkk */}
                  <div className="col-md-7 custom-border">
                    <div className="btn-group ml-3">
                      <button
                        className="btn-primary"
                        // onClick={() => handleButtonClickonEdit("Info Nasabah")}
                      >
                        Info Nasabah
                      </button>
                      <button
                        className="btn-primary"
                        // onClick={() => handleButtonClickonEdit("Ubah Password")}
                      >
                        Ubah Password
                      </button>
                      <button
                        className="btn-primary"
                        // onClick={() => handleButtonClickonEdit("Hapus Akun")}
                      >
                        Hapus Akun
                      </button>
                    </div>
                    <div className="col-md-12 mt-4 full-width">
                      <div className="">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="namaNasabah">Nama Nasabah</label>
                              <input type="text" className="form-control" id="namaNasabah" placeholder="Nama" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="noHpWa">No HP/WA</label>
                              <input type="text" className="form-control" id="noHpWa" placeholder="Nomor HP" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="alamat">Alamat</label>
                              <input type="text" className="form-control" id="alamat" placeholder="Alamat" />
                            </div>
                          </div>
                          <div className="modal-footer float-sm-right">
                            <button type="button" className="btn btn-primary " data-dismiss="modal">
                              Simpan
                            </button>
                          </div>
                        </div>
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
