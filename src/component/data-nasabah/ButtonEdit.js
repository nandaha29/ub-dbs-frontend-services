import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

export default function ButtonEdit(item) {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [dataNasabah, setDataNasabah] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeModal, setActiveModal] = useState("infoNasabah"); // State untuk mengontrol modal yang aktif
  const modalRef = useRef(null);
  // console.log(item);

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

  // const getDataNasabah = async () => {
  //   const headers = { Authorization: `Bearer ${token}` };
  //   try {
  //     const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/user?status=1&isPagination=false", { headers });
  //     setDataNasabah(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const getPermintaanID = async (ids) => {
  //   const headers = { Authorization: `Bearer ${token}` };
  //   try {
  //     const response = await axios.get(
  //       `https://devel4-filkom.ub.ac.id/bank-sampah/user/${ids}/history`,
  //       {
  //         user_id: ids,
  //         nama: formData.nama,
  //         nomor_handphone: formData.nomor_handphone,
  //         // tgl_verifikasi: "?",
  //         alamat: formData.alamat,
  //         avatar: formData.avatar,
  //       },
  //       { headers }
  //     );
  //     setFormData(response.data.data);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleDetailClick = async (id) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`https://devel4-filkom.ub.ac.id/bank-sampah/user/${id}`, { headers });
      setFormData(response.data);
      console.log(response.data);
      modalRef.current.open = true;
    } catch (error) {
      console.error("Error handling detail click:", error);
    }
  };

  const evidenceRef = useRef(null);

  const handleUpdate = async (id) => {
    // Mengirimkan data yang diperbarui ke API
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.put(`https://devel4-filkom.ub.ac.id/bank-sampah/user/${id}`, { headers, formData });
      console.log("Update successful:", response.data);
      // setIsModalOpen(false); // Menutup modal setelah pembaruan berhasil
      // toastr.success("Update success", "Success");
    } catch (error) {
      console.error("Error updating data:", error);
      // toastr.error("Update failed!", "Failed");
    }
  };

  // Function to handle modal switch
  const handleModalSwitch = (modal) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setFormData({});
    form.reset();
  };
  return (
    <>
      <button
        className="btn btn-warning btn-sm mt-1 mx-2"
        data-toggle="modal"
        data-target="#modal_edit_nasabah"
        // onClick={() => this.editItem(index)}
        onClick={() => handleDetailClick(item.id)}
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
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body justify-content-center">
              <div className="container-fluid">
                <div className="row" id="outer-container">
                  {/* PROFIL */}
                  <div className="col-md-5" id="">
                    {/* <div className="text-center"> */}
                    {/* <div className="">{selectedImage && <img src={selectedImage} alt="Preview" style={{ width: "50%" }} />}</div>
                    <input
                      type="file"
                      ref={evidenceRef}
                      className="w-full input-bordered pt-2"
                      accept="image/*"
                      onChange={handleGambar}
                      // {...form.register('banner')}
                    /> */}
                    {/* </div> */}
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
                          <div className="mt-2 font-weight-bold">: {formData.nomor_handphone}</div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                          Alamat Nasabah
                        </label>
                        <div className="col-sm-7">
                          <div className="font-weight-bold mt-2">: {formData.alamat}</div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* info dkk */}
                  <div className="col-md-7 custom-border">
                    <div className="btn-group ml-3 gap-2">
                      <button className={`btn ${activeModal === "infoNasabah" ? "btn-primary active" : "btn-light"}ml-2`} onClick={() => handleModalSwitch("infoNasabah")}>
                        Info Nasabah
                      </button>
                      <button className={`btn ${activeModal === "ubahPassword" ? "btn-primary active" : "btn-light"}ml-2`} onClick={() => handleModalSwitch("ubahPassword")}>
                        Ubah Password
                      </button>
                      <button className={`btn ${activeModal === "hapusAkun" ? "btn-primary active" : "btn-light"}`} onClick={() => handleModalSwitch("hapusAkun")}>
                        Hapus Akun
                      </button>
                    </div>
                    {activeModal === "infoNasabah" && (
                      <div className="col-md-12 mt-4 full-width">
                        <div className="">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="namaNasabah">Nama Nasabah</label>
                                <input type="text" className="form-control" id="namaNasabah" placeholder="nama" value={formData.nama} {...form.register("nama")} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="noHpWa">No HP/WA</label>
                                <input type="text" className="form-control" id="noHpWa" placeholder="Nomor HP" value={formData.nomor_handphone} {...form.register("nomor_handphone")} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="alamat">Alamat</label>
                                <input type="text" className="form-control" id="alamat" placeholder="Alamat" value={formData.alamat} {...form.register("alamat")} />
                              </div>
                            </div>
                            <div className="modal-footer float-sm-right">
                              <button type="button" className="btn btn-primary " data-dismiss="modal" onClick={form.handleSubmit(handleUpdate)}>
                                Simpan
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeModal === "ubahPassword" && (
                      // Tampilkan komponen untuk mengubah password
                      <div className="col-md-12 mt-4 full-width">
                        <div className="form-group col-md-6">
                          <label htmlFor="passwordBaru">Password Baru</label>
                          <input type="text" className="form-control" id="password_baru" placeholder="Password Baru" />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="passwordBaru">Konfirmasi Password Baru</label>
                          <input type="text" className="form-control" id="konfirmasi_password" placeholder="Konfirmasi Password" />
                        </div>
                        {/* Tempatkan form untuk mengubah password */}
                        <div className="modal-footer float-sm-right">
                          <button type="button" className="btn btn-primary " data-dismiss="modal">
                            Ubah Password
                          </button>
                        </div>
                      </div>
                    )}
                    {activeModal === "hapusAkun" && (
                      // Tampilkan komponen untuk menghapus akun
                      <div className="col-md-8 mt-4 full-width ">
                        <div className="form-group">
                          <div className="bg-red font-weight-bold pl-3 text-white text-lg">Perhatian!</div>
                          <div className="bg-grey text-black text-md py-3">
                            <div className="font-weight-semibold text-justify">Dengan menekan tombol “Hapus Akun” dibawah, akun nasabah beserta data yang telah ada akan terhapus secara permanen dan tidak dapat dipulihkan lagi.</div>
                          </div>
                          <button type="button" className="text-left btn bg-red text-white text-md my-3" data-dismiss="modal" aria-label="Close">
                            <span className=" px-2 py-2 font-weight-semibold" aria-hidden="true">
                              Hapus Akun
                            </span>
                          </button>
                        </div>
                        {/* Tempatkan form atau tombol untuk menghapus akun */}
                      </div>
                    )}
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
