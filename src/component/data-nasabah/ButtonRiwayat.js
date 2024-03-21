import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ButtonRiwayat({ user_id }) {
  const [activeButton, setActiveButton] = useState("Semua");
  const [sampah, setSampah] = useState([]);
  const [sembako, setSembako] = useState([]);
  const [token, setToken] = useState([]);
  const [formData, setFormData] = useState({});

  const getData = async (ids) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const responseSampah = await axios.get(
        `https://devel4-filkom.ub.ac.id/bank-sampah/user/${ids}/history`,
        { headers }
      );
      setSampah(responseSampah.data);

      const responseSembako = await axios.get(
        `https://devel4-filkom.ub.ac.id/bank-sampah/user/${ids}/history`,
        { headers }
      );
      setSembako(responseSembako.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("Data Sampah:", sampah);
  console.log("Data Sembako:", sembako);

  useEffect(() => {
    if (user_id) {
      getData(user_id);
    }
  }, [user_id]);

  const handleButtonClick = (category) => {
    setActiveButton(category);
  };

  return (
    <>
      <button
        className="btn btn-success btn-sm mt-1 mx-2"
        data-toggle="modal"
        data-target="#modal_riwayat_nasabah"
      >
        Riwayat
      </button>

      {/* MODAL RIWAYAT */}
      <div
        className="modal fade"
        id="modal_riwayat_nasabah"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title" id="staticBackdropLabel">
                Riwayat Transaksi Nasabah
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
            <div className="modal-body  justify-content-center">
              <div className="container-fluid">
                <div className="row">
                  {/* BUTTONS */}
                  <div className="col-xl-12 mt-5">
                    <div className="btn-group">
                      <button
                        className={`btn ${
                          activeButton === "Semua"
                            ? "btn-primary mr-2"
                            : "btn mr-2"
                        }`}
                        onClick={() => handleButtonClick("Semua")}
                      >
                        Semua
                      </button>
                      <button
                        className={`btn ${
                          activeButton === "Sampah"
                            ? "btn-primary mr-2"
                            : "btn mr-2"
                        }`}
                        onClick={() => handleButtonClick("Sampah")}
                      >
                        Sampah
                      </button>
                      <button
                        className={`btn ${
                          activeButton === "Sembako"
                            ? "btn-primary mr-2"
                            : "btn mr-2"
                        }`}
                        onClick={() => handleButtonClick("Sembako")}
                      >
                        Sembako
                      </button>
                    </div>

                    {/* START TABLE */}
                    <div className="mt-4 text-sm">
                      <table className="table table-xl table-bordered">
                        <thead className="text-center">
                          <tr className="">
                            <th className="">ID Order</th>
                            <th className="">Waktu</th>
                            <th className="">Petugas</th>
                            <th className="">Tipe Transaksi</th>
                            <th className="">Poin</th>
                            <th className="">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {(activeButton === "Sampah" ||
                            activeButton === "Semua") &&
                            sampah
                              .filter(
                                (item) => item.transaksi === "Tukar Sampah"
                              )
                              .map((item) => (
                                <tr key={item.id_sembako}>
                                  <td>{item.id_sembako}</td>
                                  <td>{item.tanggal_sembako}</td>
                                  <td>{item.Petugas}</td>
                                  <td>
                                    <button className="btn btn-warning">
                                      {item.transaksi}
                                    </button>
                                  </td>
                                  <td>{item.poin}</td>
                                  <td>
                                    <button
                                      className="btn btn-primary"
                                      data-toggle="modal"
                                      data-target="#modal_detail_nasabah"
                                    >
                                      Detail
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          {(activeButton === "Sembako" ||
                            activeButton === "Semua") &&
                            sembako
                              .filter(
                                (item) => item.transaksi === "Tukar Sembako"
                              )
                              .map((item) => (
                                <tr key={item.id_sembako}>
                                  <td>{item.id_sembako}</td>
                                  <td>{item.tanggal_sembako}</td>
                                  <td>{item.Petugas}</td>
                                  <td>
                                    <button className="btn btn-success">
                                      {item.transaksi}
                                    </button>
                                  </td>
                                  <td>{item.poin}</td>
                                  <td>
                                    <button
                                      className="btn btn-primary"
                                      data-toggle="modal"
                                      data-target="#modal_detail_nasabah"
                                    >
                                      Detail
                                    </button>
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    {/* END TABLE */}
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
