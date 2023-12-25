import React, { useState, useEffect, Component } from "react";
import axios from "axios";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";

const Table_Permintaan_Penukaran = () => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [permintaanPenukaranSampah, setPermintaanPenukaranSampah] = useState(0);

  const getPermintaanPenukaranSampah = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/slip/menabung?size=10&status=terkirim&isPagination=true", { headers });
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

  return (
    <div>
      <div className="card">
        <div className="card-header border-1">
          <h3 className="card-title">
            <i className="fas fa-chart-pie mr-1" />
            Table_Permintaan_Penukaran
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

        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-home-tab" data-toggle="tab" data-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
              Sampah
            </button>
            <button class="nav-link" id="nav-profile-tab" data-toggle="tab" data-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
              Sembako
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className="card-body table-responsive p-0 m-2">
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
                  <tr>
                    <td>121405</td>
                    <td>Andi Budionno</td>
                    <td>10-01-2021 08:14</td>
                    <td className="d-flex justify-content-center">
                      <button type="button" className="btn-primary border-0 mr-2" data-toggle="modal" data-target="#modal_proses">
                        Proses
                      </button>
                      <button className="btn-danger border-0">Tolak</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div className="card-body table-responsive p-0 m-2">
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
                  <tr>
                    <td>121405</td>
                    <td>Andi Budionno</td>
                    <td>10-01-2021 08:14</td>
                    <td className="d-flex justify-content-center">
                      <button type="button" className="btn-primary border-0 mr-2" data-toggle="modal" data-target="#modal_proses">
                        Proses
                      </button>
                      <button className="btn-danger border-0">Tolak</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modal_proses" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="staticBackdropLabel">
                <i className="fas fa-chart-pie mr-1" />
                ID Penukaran XXXXXXXXX
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                    <tr>
                      <td>Andi Budiono</td>
                      <td>2023-01-10 08:14</td>
                      <td>100104</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="justify-content-center d-flex justify-content-between m-4">
                <h5>Pengaturan Penukaran</h5>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Tambah Data
                </button>
              </div>

              <div className="row m-4">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Jenis Sampah</th>
                      <th scope="col">Berat Barang</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div className="input-group mb-3">
                          <select className="custom-select" id="inputGroupSelect01">
                            <option selected>Pilih Jenis</option>
                            <option value="1">Kertas</option>
                            <option value="1">Buku</option>
                            <option value="2">Botol Plastik</option>
                            <option value="3">Bolot Kaca</option>
                            <option value="3">Besi</option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <div className="input-group mb-3">
                          <input type="number" className="form-control" aria-label="20202" />
                          <div className="input-group-append">
                            <span className="input-group-text">kg</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <button className="btn-danger border-0 mr-2">Hapus</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h5>Total Poin : 304 Poin</h5>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger">
                Tolak
              </button>
              <button type="button" className="btn btn-success">
                Setujui
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table_Permintaan_Penukaran;
