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
    nama: "Andi Budiono1",
    waktu: "10-01-2021 08:14",
  },
];

const sampah = [
  {
    jenis_sampah: "Kertas",
    points: "200 / kg",
  },
  {
    jenis_sampah: "Kardus",
    points: "250 / kg",
  },
];

const Table_Permintaan_Penukaran_Sampah = () => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [permintaanPenukaranSampah, setPermintaanPenukaranSampah] = useState([]);
  const [formData, setFormData] = useState({});
  const modalRef = useRef(null);

  const getPermintaanPenukaranSampah = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/slip/menabung?size=10&status=terkirim", { headers });
      setPermintaanPenukaranSampah(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPermintaanID = async (ids) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(`https://devel4-filkom.ub.ac.id/slip/menabung/${ids}`, { headers });
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
        getPermintaanPenukaranSampah();
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const getParam = async (ids, stat) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.put(
        `https://devel4-filkom.ub.ac.id/slip/menabung?status=${stat}`,
        {
          no_tabungan: ids,
          id_petugas: "PETUGASxVQsD34MhNI-gjKnMaiYp",
          status: stat,
          items_sampah: formData.list_sampah,
        },
        { headers }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const tolakPermintaan = (ids) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menolak permintaan ini?");
    if (isConfirmed) {
      getParam(ids, 2);
      toastr.error("Permintaan telah ditolak!", "Berhasil!");
    }
  };

  const setujuiPermintaan = (ids) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menyetujui permintaan ini?");
    if (isConfirmed) {
      getParam(ids, 1);
      toastr.success("Permintaan telah disetujui!", "Berhasil!");
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
          <h3 className="card-title">
            <i className="fas fa-chart-pie mr-1" />
            Table_Permintaan_Penukaran_Sampah
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {permintaanPenukaranSampah.map((item) => (
                    <tr key={item.id_slip}>
                      <td>{item.id_slip}</td>
                      <td>{item.nama_user}</td>
                      <td>{formatDate(item.tanggal.date)}</td>
                      <td className="d-flex">
                        <button type="button" className="btn-primary border-0 mr-2" data-toggle="modal" data-target="#modal_proses_sampah" onClick={() => handleDetailClick(item.id_slip)}>
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

      <div className="modal fade" ref={modalRef} id="modal_proses_sampah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="staticBackdropLabel">
                <i className="fas fa-chart-pie mr-1" />
                ID Penukaran <p className="text-secondary">{formData.no_tabungan}</p>
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="mb-4 ml-4">Profil Penukaran</h5>
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
                      <td>{formData.tanggal != null ? `${formData.tanggal.date.day}/${formData.tanggal.date.month}/${formData.tanggal.date.year}` : null}</td>
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
                      <th scope="col">Jenis Sampah</th>
                      <th scope="col">Poin/kg</th>
                      <th scope="col">Berat Barang</th>
                    </tr>
                  </thead>

                  <tbody>
                    {formData.list_sampah &&
                      formData.list_sampah.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <label>{item.nama_sampah}</label>
                          </td>
                          <td>
                            <label className="text-sm ">{item.jumlah_poin}</label>
                          </td>
                          <td>
                            <div className="input-group mb-3">
                              <input type="number" className="form-control" aria-label={`berat_barang_${index}`} placeholder={item.berat} />
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
                <span className="font-weight-normal">Total</span>
                {/* <span> {formData.total_poin + item.jumlah_poin} Poin</span> */}
                {/* <span>
                  {formData.total_poin} + {formData.item.jumlah_poin} Poin
                </span> */}
                <span> {formData.total_poin} Poin</span>
              </h5>
            </div>

            <div className="modal-footer text-center justify-content-center">
              <button type="button" className="btn btn-danger px-5 py-2 " data-dismiss="modal" onClick={() => tolakPermintaan(formData.no_tabungan)}>
                Tolak
              </button>
              <button type="button" className="btn btn-success px-5 py-2" data-dismiss="modal" onClick={() => setujuiPermintaan(formData.no_tabungan)}>
                Setujui
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table_Permintaan_Penukaran_Sampah;
