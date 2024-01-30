import React, { useState, useEffect, useRef, Component } from "react";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
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

  const [data_nasabah, setDataNasabah] = useState([]);
  const [id, setIdSembako] = useState(0);
  const [nama, setNameSembako] = useState("");
  const [thumbnail, setFotoSembako] = useState("");
  const [status, setStatus] = useState("");
  const [harga_tukar_poin, setPoinSembako] = useState(0);
  const [stok, setStokSembako] = useState(0);

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

  // const showTable = () => {
  //   return kelolaSembako.map((item, index) => {
  //     return (
  //       <tr key={index}>
  //         <td className="mt-1 mx-2">{index + 1}</td>
  //         <td className="mt-1 mx-2">{item.id_sembako}</td>
  //         <td className="mt-1 mx-2">
  //           <img src={`data:image/png;base64, ${item.foto_sembako}`} alt={`Foto ${item.foto_sembako}`} style={{ width: "50px" }} />
  //         </td>
  //         <td className="mt-1 mx-2">{item.name_sembako}</td>
  //         <td className="mt-1 mx-2">{item.poin_sembako}</td>
  //         <td className="mt-1 mx-2">{item.stok_sembako}</td>
  //         <td>
  //           <button
  //             className={`mt-1 mx-2 text-center ${item.status === "Aktif" ? "btn btn-success btn-sm pl-5 pr-5 text-center" : item.status === "Diarsipkan" ? "btn btn-secondary btn-sm pl-4 pr-4 text-center" : ""}`}
  //             style={{ pointerEvents: "none" }}
  //           >
  //             {item.status}
  //           </button>
  //         </td>
  //         <td className="d-flex justify-content-center">
  //           <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_return_whitelist" onClick={() => editItem(index)}>
  //             Edit
  //           </button>
  //           <button className="btn btn-warning btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_hapus_akun" onClick={() => toggleStatus(index)}>
  //             {item.status === "Aktif" ? "Arsipkan" : "Aktifkan"}
  //           </button>
  //           <button className="btn btn-danger btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_hapus_akun" onClick={() => handleDelete(index)}>
  //             Hapus
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // };

  const handleTambahSembako = () => {
    // Add new sembako to data_nasabah using setDataNasabah
  };

  const clearFields = () => {
    setIdSembako("");
    setNameSembako("");
    setFotoSembako("");
    setStatus("");
    setPoinSembako(0);
    setStokSembako(0);
  };

  const editItem = (index) => {
    // Set editingItem using data_nasabah[index]
    // Open modal for editing
  };

  const toggleStatus = (index) => {
    // Change status of data_nasabah[index]
    // Update data_nasabah using setDataNasabah
  };

  const handleDelete = (index) => {
    // Remove data\_nasabah[index] from data\_nasabah
    // Update data\_nasabah using setDataNasabah
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

  const handleDetailClick = async (id) => {
    try {
      await getPermintaanID(id);
      modalRef.current.open = true;
    } catch (error) {
      console.error("Error handling detail click:", error);
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
    return () => {
      listen();
    };
  }, []);
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

            {/* <tbody className="text-center">{this.showTable()}</tbody> */}
            <tbody>
              {kelolaSembako.map((item) => (
                <tr key={item.id}>
                  <td className="col-md-1">{item.id}</td>
                  <td className="col-md-1">{item.img_url}</td>
                  <td>{item.nama}</td>
                  <td>{item.harga_tukar_poin}</td>
                  <td>{item.stok}</td>
                  <td className="">
                    {/* <button
                      className={`mt-1 mx-2 text-center ${item.status === "Aktif" ? "btn btn-success btn-sm pl-5 pr-5 text-center" : item.status === "Diarsipkan" ? "btn btn-secondary btn-sm pl-4 pr-4 text-center" : ""}`}
                      style={{ pointerEvents: "none" }}
                    > */}
                    {item.status}
                    {/* </button> */}
                  </td>
                  <td className="d-flex ">
                    <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_edit" onClick={() => handleDetailClick(item.id_slip)}>
                      Edit
                    </button>
                    <button className="btn btn-warning btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_hapus_akun" onClick={() => toggleStatus(item)}>
                      Arsipkan
                    </button>
                    <button className="btn btn-danger btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_hapus_akun" onClick={() => handleDelete(item)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
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
                    <div className="">
                      {/* <div className="">{selectedImage && <img src={selectedImage} alt="Preview" style={{ width: "50%" }} />}</div> */}
                      {/* <input type="file" accept=".png" onChange={this.handleImageUpload} /> */}
                      preview foto aja
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
                      {/* <input
                        type="text"
                        className="form-control text-sm font-weight-bold"
                        value={formData.nama_sembako}
                        onChange={(e) =>
                          this.setState({
                            editingItem: {
                              ...this.state.editingItem,
                              name_sembako: e.target.value,
                            },
                          })
                        }
                      /> */}
                      <div className="input-group mb-3">
                        <input
                          type="number"
                          className="form-control"
                          // aria-label={formData.nama}
                          placeholder={formData.nama}
                        />
                      </div>
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
                      {/* <input
                        type="number"
                        className="form-control text-sm font-weight-bold "
                        value={formData.poin_per}
                        onChange={(e) =>
                          this.setState({
                            editingItem: {
                              ...this.state.editingItem,
                              poin_sembako: parseInt(e.target.value),
                            },
                          })
                        }
                      /> */}
                      <div className="input-group mb-3">
                        <input
                          type="number"
                          className="form-control"
                          // aria-label={formData.nama}
                          placeholder={formData.harga_tukar_poin}
                        />
                      </div>
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
                      {/* <input
                        type="number"
                        className="form-control text-sm font-weight-bold"
                        value={stok}
                        onChange={(e) =>
                          this.setState({
                            editingItem: {
                              ...this.state.editingItem,
                              stok_sembako: parseInt(e.target.value),
                            },
                          })
                        }
                      /> */}
                      <div className="input-group mb-3">
                        <input
                          type="number"
                          className="form-control"
                          // aria-label={formData.nama}
                          placeholder={formData.nama}
                        />
                      </div>
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
                      {/* <input type="file" accept=".png" onChange={this.handleImageUpload} /> */}
                      preview aja
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
                      <input
                        type="text"
                        className="form-control text-sm font-weight-bold"
                        // value={this.state.id_sembako}
                        // onChange={(e) => this.setState({ id_sembako: e.target.value })}
                      />
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
                        // onChange={(e) => this.setState({ name_sembako: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="row px-5 text-md">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="text-sm">Status:</label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control text-sm font-weight-bold"
                        // value={this.state.status}
                        // onChange={(e) => this.setState({ status: e.target.value })}
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
                        // onChange={(e) => this.setState({ poin_sembako: e.target.value })}
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
                        // onChange={(e) => this.setState({ stok_sembako: e.target.value })}
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
              <button
                type="button"
                className="btn btn-secondary"
                // onClick={this.clearFields}
              >
                Refresh
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                // onClick={this.handleTambahSembako}
              >
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
