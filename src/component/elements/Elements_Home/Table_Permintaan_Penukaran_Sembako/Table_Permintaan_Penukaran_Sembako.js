//Table_Permintaan_Penukaran_Sembako

import React, { useState, useEffect, Component } from "react";
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
  const [permintaanPenukaranSampah, setPermintaanPenukaranSampah] = useState(0);

  const getPermintaanPenukaranSampah = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        "https://devel4-filkom.ub.ac.id/slip/menabung?size=10&status=terkirim&isPagination=true",
        { headers }
      );
      setPermintaanPenukaranSampah(response.data.data.length);
      console.log(response.data.data.length);
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
        getPermintaanPenukaranSampah();
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
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menolak permintaan ini?"
    );
    if (isConfirmed) {
      toastr.error("Permintaan telah ditolak!", "Berhasil!");
    }
  };

  const setujuiPermintaan = () => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menyetujui permintaan ini?"
    );
    if (isConfirmed) {
      toastr.success("Perimntaan telah disetujui!", "Berhasil!");
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header border-1">
          <h3 className="card-title">
            <i className="fas fa-chart-pie mr-1" />
            Table_Permintaan_Penukaran_Sembako
          </h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus" />
            </button>
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>

        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-home-tab"
              data-toggle="tab"
              data-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              Sembako
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
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
                  {dataprofil.map((item) => (
                    <tr key={item.id_order}>
                      <td>{item.id_order}</td>
                      <td>{item.nama}</td>
                      <td>{item.waktu}</td>
                      <td className="d-flex">
                        <button
                          type="button"
                          className="btn-primary border-0 mr-2"
                          data-toggle="modal"
                          data-target="#modal_proses_sembako"
                        >
                          Proses
                        </button>
                        <button className="btn-danger border-0">Tolak</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modal_proses_sembako"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="staticBackdropLabel">
                <i className="fas fa-chart-pie mr-1" />
                ID Penukaran XXXXXXXXX
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="m-4">Profil Penukaran</h5>
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
                    {dataprofil.map((item) => (
                      <tr key={item.id_order}>
                        <td>{item.nama}</td>
                        <td>{item.waktu}</td>
                        <td>{item.id_nasabah}</td>
                      </tr>
                    ))}
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
                      <th scope="col">Berat Barang</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sampah.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <label>{item.jenis_sampah}</label>
                          <br />
                          <label className="text-sm">{item.points}</label>
                        </td>
                        <td>
                          <div className="input-group mb-3">
                            <input
                              type="number"
                              className="form-control"
                              aria-label={`berat_barang_${index}`}
                            />
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
                <span> -304 Poin</span>
              </h5>
              <div className="text-center">
                <button className="btn btn-dark px-4">Hitung</button>
              </div>
            </div>

            <div className="modal-footer text-center justify-content-center">
              <button
                type="button"
                className="btn btn-danger px-5 py-2 "
                data-dismiss="modal"
                onClick={tolakPermintaan}
              >
                Tolak
              </button>
              <button
                type="button"
                className="btn btn-success px-5 py-2"
                data-dismiss="modal"
                onClick={setujuiPermintaan}
              >
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
