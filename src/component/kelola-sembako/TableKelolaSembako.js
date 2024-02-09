import React, { useState, useEffect, useRef, Component } from "react";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import $, { noConflict } from "jquery";
import "toastr/build/toastr.css";
import toastr from "toastr";

const dataprofil = [
  {
    id_slip: "121405",
    thumbnail: "100456",
    nama_sembako: "Andi Budiono",
    poin_per: "10-01-2021 08:14",
    stok: "2",
    poin_per: "14",
    status: "Aktif",
  },
];

const sampah = [
  {
    jenis_sampah: "Minyak",
    points: "200 / kg",
  },
  {
    jenis_sampah: "Gula",
    points: "250 / kg",
  },
  {
    jenis_sampah: "Beras",
    points: "200 / kg",
  },
];

const TableKelolaSembako = () => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [kelolaSembako, setKelolaSembako] = useState([]);
  const [formData, setFormData] = useState({});
  const modalRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const form = useForm({
    defaultValues: {
      id: formData.id,
      nama: formData.nama,
      hargaTukar: formData.harga_tukar_poin,
      thumbnail: formData.img_url,
      stok: formData.stok,
    },
  });

  const addForm = useForm({
    nama: "",
    hargaTukar: 0,
    thumbnail: "",
    stok: 0,
  });

  const getKelolaSembako = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/barang-penukaran", { headers });
      setKelolaSembako(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const getPermintaanID = async (ids) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(`https://devel4-filkom.ub.ac.id/bank-sampah/barang-penukaran/${ids}`, { headers });
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTambah = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const oldVals = addForm.getValues();
    const formData = new FormData();

    // Append form fields to formData object
    formData.append("nama", oldVals.nama);
    formData.append("hargaTukar", oldVals.hargaTukar);
    formData.append("stok", oldVals.stok);
    formData.append("thumbnail", oldVals.thumbnail);

    try {
      const response = await axios.post(`https://devel4-filkom.ub.ac.id/bank-sampah/barang-penukaran`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data", // Set correct content type
        },
      });
      console.log(response.data);
      // Optionally, you can reset the form after successful submission
      addForm.reset();
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const arsip = async (ids, stat) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      let response;
      response = await (stat === "AKTIF"
        ? axios.put(`https://devel4-filkom.ub.ac.id/bank-sampah/barang-penukaran/${ids}/status?status=false`, {}, { headers })
        : axios.put(`https://devel4-filkom.ub.ac.id/bank-sampah/barang-penukaran/${ids}/status?status=true`, {}, { headers }));
      console.log(response);
      if (response.status === 200) {
        alert("Berhasil mengubah status barang penukaran");
      } else {
        alert("Gagal mengubah status barang penukaran");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hapus = async (ids) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.delete(`https://devel4-filkom.ub.ac.id/bank-sampah/barang-penukaran/${ids}`, { headers });
      console.log(response.data);
      if (response.status === 200) {
        alert("Berhasil menghapus barang penukaran");
      } else {
        alert("Gagal menghapus barang penukaran");
      }
      window.location.reload();
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

  const handleUpdate = async (formData) => {
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" };
    try {
      const formDataWithFile = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "thumbnail" && key !== "id") {
          formDataWithFile.append(key, value);
        }
      });
      if (formData.thumbnail) {
        formDataWithFile.append("thumbnail", formData.thumbnail);
      }
      for (var pair of formDataWithFile.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await axios.put(`https://devel4-filkom.ub.ac.id/bank-sampah/barang-penukaran/${formData.id}`, formDataWithFile, { headers });
      if (response.status === 200) {
        alert("Berhasil mengubah isi barang penukaran");
      } else {
        alert("Gagal mengubah isi barang penukaran");
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

  const showTable = () => {
    try {
      return kelolaSembako.map((item, index) => (
        <tr key={index}>
          <td className="col-md-1">{item.id}</td>
          <td className="col-md-1">
            <img src={item.img_url} width="50" height="50" alt={item.nama} />
          </td>
          <td>{item.nama}</td>
          <td>{item.harga_tukar_poin}</td>
          <td>{item.stok}</td>
          <td className="">{item.status}</td>
          <td className="d-flex ">
            <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_edit" onClick={() => handleDetailClick(item.id)}>
              Edit
            </button>
            <button className="btn btn-warning btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_hapus_akun" onClick={() => arsip(item.id, item.status)}>
              {item.status === "AKTIF" ? "Arsipkan" : "Aktifkan"}
            </button>
            <button className="btn btn-danger btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_hapus_akun" onClick={() => hapus(item.id)}>
              Hapus
            </button>
          </td>
        </tr>
      ));
    } catch (e) {
      alert(e.message);
      return null;
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        // console.log(tes);
        getKelolaSembako();
      } else {
        setAuthUser(null);
      }
    });

    // Set nilai-nilai form berdasarkan data formData
    form.setValue("id", formData.id);
    form.setValue("nama", formData.nama);
    form.setValue("hargaTukar", formData.harga_tukar_poin);
    form.setValue("thumbnail", formData.img_url);
    form.setValue("stok", formData.stok);
    setSelectedImage(formData.img_url);

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
      <div className="mr-4 float-sm-right">
        <button className="btn-primary btn" data-toggle="modal" data-target="#modal_tambah">
          + Tambah Sembako
        </button>
      </div>
      <div className="container-fluid">
        <div className="table-responsive p-0 pb-2">
          <table id="table" className="table mb-0 table-striped">
            <thead>
              <tr>
                <th className="text-uppercase  text-sm ">ID Sembako</th>
                <th className="text-uppercase  text-sm ">Foto</th>
                <th className="text-uppercase  text-sm ">Nama Sembako</th>
                <th className="text-uppercase  text-sm ">Poin per 0,5 kg</th>
                <th className="text-uppercase  text-sm ">Stok</th>
                <th className="text-uppercase  text-sm ">Status</th>
                <th className="text-uppercase  text-sm ">Action</th>
              </tr>
            </thead>

            <tbody className="text-center">{showTable()}</tbody>
          </table>
        </div>
      </div>

      {/* Batas SECTION MODAL */}
      {/* MODAL EDIT */}
      <div className="modal fade" ref={modalRef} id="modal_edit" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                    <div className="text-center">
                      <div className="">{selectedImage && <img src={selectedImage} alt="Preview" style={{ width: "50%" }} />}</div>
                      {/* <input type="file" accept=".png" onChange={this.handleImageUpload} /> */}
                      <input
                        type="file"
                        ref={evidenceRef}
                        className="w-full input-bordered pt-2"
                        accept="image/*"
                        onChange={handleGambar}
                        // {...form.register('banner')}
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
                      <div type="text" className="form-control text-left text-sm font-weight-bold">
                        {formData.id}
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
                        className="form-control text-sm"
                        // value={formData.nama}
                        {...form.register("nama")}
                      />
                      {/* <div className="input-group mb-3">
                        <input
                          type="number"
                          className="form-control"
                          // aria-label={formData.nama}
                          placeholder={formData.nama}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="row px-5 text-md">
                  <div className="col-md-4">
                    <div className="form-group ">
                      <label className="text-sm">Harga per poin 0.5 kg (poin):</label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control text-sm"
                        // value={formData.nama}
                        {...form.register("hargaTukar")}
                      />
                      {/* <div className="input-group mb-3">
                        <input
                          type="number"
                          className="form-control"
                          // aria-label={formData.nama}
                          placeholder={formData.harga_tukar_poin}
                        />
                      </div> */}
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
                        type="text"
                        className="form-control text-sm"
                        // value={formData.nama}
                        {...form.register("stok")}
                      />
                      {/* <div className="input-group mb-3">
                        <input
                          type="number"
                          className="form-control"
                          // aria-label={formData.nama}
                          placeholder={formData.nama}
                        />
                      </div> */}
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
                // onClick={this.closeModal}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={form.handleSubmit(handleUpdate)}
                // onClick={this.saveChanges}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END OF MODALS EDIT */}
      {/* ADD MODALS */}
      <div className="modal fade" ref={modalRef} id="modal_tambah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                      {/* <div className="">{selectedImage && <img src={selectedImage} alt="Preview" style={{ width: "50%" }} />}</div> */}
                      <input type="file" accept=".png" onChange={(e) => addForm.setValue("thumbnail", e.target.files[0])} />
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
                        // value={this.state.name_sembako}
                        onChange={(e) => addForm.setValue("nama", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row px-5 text-md">
                  <div className="col-md-4">
                    <div className="form-group ">
                      <label className="text-sm">Harga per poin 0.5 kg (poin):</label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control text-sm font-weight-bold "
                        // value={this.state.poin_sembako}
                        onChange={(e) => addForm.setValue("hargaTukar", e.target.value)}
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
                        // value={this.state.stok_sembako}
                        onChange={(e) => addForm.setValue("stok", e.target.value)}
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
                // onClick={this.closeModal}
              >
                Batal
              </button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleTambah}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableKelolaSembako;
