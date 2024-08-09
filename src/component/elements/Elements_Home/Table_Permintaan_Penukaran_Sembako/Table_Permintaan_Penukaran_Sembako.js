//Table_Permintaan_Penukaran_Sembako

import React, { useState, useEffect, useRef, Component } from "react";
import axios from "axios";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";

import "toastr/build/toastr.css";
import toastr from "toastr";

const dataprofil = [
  {
    id_order: "121405",
    id_nasabah: "100456",
    nama: "Andi Budiono",
    waktu: "10-01-2021 08:14",
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

const Table_Permintaan_Penukaran_Sembako = () => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [formData, setFormData] = useState({});
  const modalRef = useRef(null);
  const [permintaanPenukaranSembako, setPermintaanPenukaranSembako] = useState([]);

  const getPermintaanPenukaranSembako = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/slip/penukaran?size=10&status=terkirim&isPagination=true", { headers });
      setPermintaanPenukaranSembako(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPermintaanID = async (ids) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `https://devel4-filkom.ub.ac.id/slip/penukaran/${ids}`,
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
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        // console.log(tes);
        getPermintaanPenukaranSembako();
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userKeluarAkun = () => {
    signOut(auth)
      .then(() => {
        console.log("udah keluar akun berhasil");
      })
      .catch((error) => console.log(error));
  };

  const tolakPermintaan = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menolak permintaan ini?");
    if (isConfirmed) {
      toastr.error("Permintaan telah ditolak!", "Berhasil!");
    }
  };

  const setujuiPermintaan = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menyetujui permintaan ini?");
    if (isConfirmed) {
      toastr.success("Perimntaan telah disetujui!", "Berhasil!");
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

  return (
    <div>
      <div className="card">
        <div className="card-header border-1">
          <h3 className="card-title mt-1">
            <i className="fas fa-chart-pie mr-1" />
            Table Permintaan Penukaran Sembako
          </h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse">
              <i className="fas fa-minus" />
            </button>
            <button type="button" className="btn btn-tool" data-card-widget="remove">
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className="card-body table-responsive p-0">
              <table className="table table-striped table-valign-middle ">
                <thead>
                  <tr>
                    <th>ID Order</th>
                    <th>Nama</th>
                    <th>Waktu</th>
                    <th className="">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {permintaanPenukaranSembako.map((item) => (
                    <tr key={item.id_slip}>
                      <td>{item.id_slip}</td>
                      <td>{item.nama_user}</td>
                      <td>{item.tanggal}</td>
                      <td className="d-flex">
                        <button type="button" className="btn-primary border-0 mr-2" data-toggle="modal" data-target="#modal_proses_sembako" onClick={() => handleDetailClick(item.id_slip)}>
                          Detail
                        </button>
                        {/* <button className="btn-danger border-0">Tolak</button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" ref={modalRef} id="modal_proses_sembako" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="staticBackdropLabel">
                <i className="fas fa-chart-pie mr-1" />
                ID Penukaran <p className="text-secondary">{formData.id}</p>
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="ml-4">Profil Penukaran</h5>
              <div className="row m-4">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Nama Pemohon</th>
                      <th scope="col">Waktu Request</th>
                      <th scope="col">ID Pemohon</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr key={formData.no_tabungan}>
                      <td>{formData.nasabah}</td>
                      {/* <td>{formData.tanggal != null ? `${formData.tanggal.day}/${formData.tanggal.month}/${formData.tanggal.year}` : null}</td> */}
                      <td>{formData.tanggal}</td>
                      <td>{formData.id_user}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="justify-content-center d-flex justify-content-between m-4">
                <h5>Detail Penukaran</h5>
              </div>

              <div className="row m-4">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Jenis Sembako</th>
                      <th scope="col">Poin/kg</th>
                      <th scope="col">Berat Barang</th>
                    </tr>
                  </thead>

                  <tbody>
                    {formData.items_penukaran &&
                      formData.items_penukaran.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <label>{item.nama_barang}</label>
                          </td>
                          <td>
                            <label className="text-sm">{item.total_harga_poin}</label>
                          </td>
                          <td>
                            <div className="input-group mb-3">
                              <input type="number" className="form-control" aria-label={`berat_barang_${index}`} placeholder={item.berat} readOnly />
                              <div className="input-group-append">
                                <span className="input-group-text">kg</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <h5 className="text-center">
                {" "}
                <span className="font-weight-normal">Total</span>
                <span> {formData.debet} Poin</span>
              </h5>
            </div>

            <div className="modal-footer text-center justify-content-center">
              <button type="button" className="btn btn-danger px-5 py-2 " data-dismiss="modal" onClick={tolakPermintaan}>
                Tolak
              </button>
              <button type="button" className="btn btn-success px-5 py-2" data-dismiss="modal" onClick={setujuiPermintaan}>
                Setujui
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table_Permintaan_Penukaran_Sembako;
