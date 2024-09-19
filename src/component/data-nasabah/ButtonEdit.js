import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

import "toastr/build/toastr.css";
import toastr from "toastr";

export default function ButtonEdit(item) {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [dataNasabah, setDataNasabah] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [passwordAwal, setPasswordAwal] = useState("");
  const [activeModal, setActiveModal] = useState("infoNasabah"); // State untuk mengontrol modal yang aktif
  const modalRef = useRef(null);

  const form = useForm({
    defaultValues: {
      user_id: "",
      nama: "",
      nomor_handphone: "",
      avatar: "",
      alamat: "",
      status: "",
    },
  });
  // console.log(form.watch());

  const [errorMessage, setErrorMessage] = useState("");

  const handlePassword = () => {
    if (form.watch("password") !== passwordAwal) {
      setErrorMessage("Konfirmasi password tidak sesuai dengan password baru.");
    } else {
      setErrorMessage("");
      toastr.success("Berhasil Mengganti Password");
    }
  };

  const handleDetailClick = async (id) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`https://cat-tif.ub.ac.id/bank-sampah/user/${id}`, { headers });
      setFormData(response.data);
      Object.keys(response.data).forEach((key) => {
        form.setValue(key, response.data[key]);
      });
      console.log(response.data);
      modalRef.current.open = true;
    } catch (error) {
      console.error("Error handling detail click:", error);
    }
  };

  const evidenceRef = useRef(null);

  const handleUpdate = async () => {
    // Mengirimkan data yang diperbarui ke API
    const { nama, nomor_handphone, alamat, status } = formData;
    let updatedStatus = status;
    if (status === "VERIFIED") {
      updatedStatus = 1;
    } else if (status === "UNVERIFIED") {
      updatedStatus = 0;
    }

    // console.log("Updated form data:", formData);

    const updatedFormData = { nama, nomor_handphone, alamat, status: updatedStatus };

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.put(`https://cat-tif.ub.ac.id/bank-sampah/user/${item.id}`, updatedFormData, { headers });
      // console.log("Update successful:", response.data);
      toastr.success("Update success", "Success");
      handleDetailClick(item.id);
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      toastr.error("Update failed!", "Failed");
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const hapus = async (ids) => {
    // const headers = { Authorization: `Bearer ${token}` };
    // try {
    //   const response = await axios.delete(`https://cat-tif.ub.ac.id/bank-sampah/sampah/${ids}`, { headers });
    //   console.log(response.data);
    //   if (response.status === 200) {
    //     alert("Berhasil menghapus barang");
    //   } else {
    //     alert("Gagal menghapus barang");
    //   }
    //   window.location.reload();
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    //   toastr.error("fitur delete belum tersedia");
    // }
    toastr.error("fitur delete belum tersedia");
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setToken(user.accessToken);
      }
    });
    return () => {
      listen();
    };
  }, [formData]);

  return (
    <>
      <button className="btn btn-warning btn-sm mt-1 mx-2" data-toggle="modal" data-target={`#modal_edit_nasabah_${item.id}`} onClick={() => handleDetailClick(item.id)}>
        Edit
      </button>

      {/* MODAL EDIT */}
      <div className="modal fade" ref={modalRef} id={`modal_edit_nasabah_${item.id}`} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel_${item.id}`} aria-hidden="true">
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
                                <input
                                  type="text"
                                  className="form-control"
                                  id="namaNasabah"
                                  placeholder="Nama"
                                  // value={formData.nama}
                                  {...form.register("nama")}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="noHpWa">No HP/WA</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="noHpWa"
                                  placeholder="Nomor HP"
                                  // value={formData.nomor_handphone}
                                  {...form.register("nomor_handphone")}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="alamat">Alamat</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="alamat"
                                  placeholder="Alamat"
                                  // value={formData.alamat}
                                  {...form.register("alamat")}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="modal-footer float-sm-right">
                              <button type="button" className="btn btn-primary" onClick={form.handleSubmit(handleUpdate)}>
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
                          <label htmlFor="password_baru">Password Baru</label>
                          <input type="password" className="form-control" id="password_baru" placeholder="Password Baru" onChange={(e) => setPasswordAwal(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="konfirmasi_password">Konfirmasi Password Baru</label>
                          <input type="password" className="form-control" id="konfirmasi_password" placeholder="Konfirmasi Password" {...form.register("password")} />
                        </div>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        {/* Tempatkan form untuk mengubah password */}
                        <div className="modal-footer float-sm-right">
                          <button type="button" className="btn btn-primary " onClick={handlePassword}>
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
                          <button type="button" className="text-left btn bg-red text-white text-md my-3" data-dismiss="modal" onClick={() => hapus(item.id)}>
                            <span className=" px-2 py-2 font-weight-semibold" aria-hidden="true">
                              Hapus Akun
                            </span>
                          </button>
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
    </>
  );
}
